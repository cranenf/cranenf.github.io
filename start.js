// 个人网站本地服务器
// 用法：双击 start.bat，或命令行运行 node start.js
//       然后浏览器打开 http://localhost:8000
//
// 特性：
//   1. 静态文件服务（自动处理中文文件名与 URL 编码）
//   2. /api/posts 接口：实时扫描 posts/ 目录下的所有 .md 文件
//      把新的 .md 丢进 posts/ 目录，刷新网页就出现，不需要改任何代码
//   3. 自动维护 posts-data.js 快照：
//      这样即使你直接双击 index.html（file:// 协议）打开，也能看到文章列表

const http = require('http');
const fs = require('fs');
const path = require('path');
const { collectPosts, writeSnapshot, POSTS_DIR } = require('./build-posts.js');

const ROOT = __dirname;
const PORT = 8000;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
};

// 重新生成 posts-data.js 快照（供 file:// 直接打开时使用）
function refreshSnapshot() {
    writeSnapshot((err, list) => {
        if (err) {
            console.error('生成 posts-data.js 失败：', err.message);
        } else {
            console.log('已更新 posts-data.js（' + list.length + ' 篇文章）');
        }
    });
}

const server = http.createServer((req, res) => {
    // 去掉查询串并解码百分号编码（中文文件名必须解码才能定位到文件）
    let urlPath;
    try {
        urlPath = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('错误的请求路径');
        return;
    }

    // 文章清单接口
    if (urlPath === '/api/posts') {
        collectPosts((err, list) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: String(err) }));
                return;
            }
            // 顺便刷新快照，保证 file:// 直开时也是最新的
            refreshSnapshot();
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-store'
            });
            res.end(JSON.stringify(list.map(p => ({
                file: p.file,
                title: p.title,
                date: p.date,
                tags: p.tags,
                category: p.category
            }))));
        });
        return;
    }

    // 静态文件
    const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const fp = path.resolve(ROOT, rel);

    // 防止越出网站根目录
    if (!fp.startsWith(ROOT)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    fs.readFile(fp, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not Found');
            return;
        }
        const ext = path.extname(fp).toLowerCase();
        res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Cache-Control': 'no-store'
        });
        res.end(data);
    });
});

// 监听 posts/ 目录（含子目录）：新增、修改、删除 .md 时自动重建快照
function watchPosts() {
    try {
        let timer = null;
        // 监听整个 posts 目录树
        fs.watch(POSTS_DIR, { recursive: true }, (eventType, filename) => {
            if (!filename || !String(filename).toLowerCase().endsWith('.md')) return;
            clearTimeout(timer);
            timer = setTimeout(() => {
                console.log('检测到文章变动：' + filename);
                refreshSnapshot();
            }, 300);
        });
        console.log('已监听 posts/ 目录（含子目录），放入 .md 文件会自动更新。');
    } catch (e) {
        console.log('无法监听 posts/ 目录（不影响使用）：' + e.message);
    }
}

server.listen(PORT, () => {
    console.log('');
    console.log('  个人网站服务器已启动');
    console.log('  请在浏览器打开： http://localhost:' + PORT);
    console.log('  把 .md 文件放进 posts/ 目录，刷新网页即可看到新文章。');
    console.log('');
    console.log('  关闭此窗口即停止服务器。');
    console.log('');
    refreshSnapshot();
    watchPosts();
});
