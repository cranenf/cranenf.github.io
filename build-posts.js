// 扫描 posts/ 目录（含子目录），生成 posts-data.js
//
// 用途：让 index.html 被直接双击（file:// 协议）打开时也能显示文章列表和分类。
// 因为浏览器在 file:// 下禁止 fetch 读取本地文件，但 <script> 标签不受此限制，
// 所以这里把文章数据预先写成一份 JS 文件，由页面用 <script> 引入。
//
// 直接运行：  node build-posts.js
// 被引用时：  require('./build-posts.js').collectPosts(cb) / .writeSnapshot(cb)

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const POSTS_DIR = path.join(ROOT, 'posts');
const OUT_FILE = path.join(ROOT, 'posts-data.js');

// 递归扫描目录，收集所有 .md 文件（含子目录）
// 返回 { file: "相对路径", category: "子目录名/null", ... }
function scanMdFilesSync(dir, baseDir) {
    const results = [];
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
        return results;
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // 跳过隐藏目录
            if (entry.name.startsWith('.')) continue;
            results.push(...scanMdFilesSync(full, baseDir));
        } else if (entry.name.toLowerCase().endsWith('.md')) {
            const rel = path.relative(baseDir, full);
            // 分离 category：如果文件就在 posts/ 根目录，category 为 null
            const parts = rel.split(path.sep);
            const category = parts.length > 1 ? parts[0] : null;
            results.push({ file: rel, category: category });
        }
    }
    return results;
}

// 读取 posts/posts.json 清单（仅用于根目录下.md 的覆盖，子目录的.md 不需要）
// 注意：子目录的.md 文件不再需要 posts.json 覆盖，直接从文件名和内容推导
function readManifest() {
    const manifest = {};
    try {
        const raw = fs.readFileSync(path.join(POSTS_DIR, 'posts.json'), 'utf8').replace(/^\uFEFF/, '');
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
            list.forEach(item => { if (item && item.file) manifest[item.file] = item; });
        }
    } catch (e) {
        // 没有清单也无所谓
    }
    return manifest;
}

// 读取单个 .md 文件，返回元数据
function readMdFile(filePath) {
    let text = '';
    try {
        text = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
    } catch (e) {
        return null;
    }
    const entry = { content: '' };

    // 标题：第一个 "# " 开头的行
    const titleMatch = text.match(/^#\s+(.+?)\s*$/m);
    entry.title = titleMatch ? titleMatch[1].trim() : path.basename(filePath).replace(/\.md$/i, '');

    // 标签（可选）：<!-- tags: a, b -->
    const tagMatch = text.match(/<!--\s*tags\s*:\s*(.+?)\s*-->/i);
    entry.tags = tagMatch
        ? tagMatch[1].split(/[,，]/).map(s => s.trim()).filter(Boolean)
        : [];

    // 日期（可选）：<!-- date: 2024-01-15 -->
    const dateMatch = text.match(/<!--\s*date\s*:\s*([\d-]+)\s*-->/i);
    if (dateMatch) entry.date = dateMatch[1];

    return { text, entry };
}

// 扫描目录，收集所有 .md 的元数据和正文
function collectPosts(callback) {
    try {
        const manifest = readManifest();
        const mdFiles = scanMdFilesSync(POSTS_DIR, POSTS_DIR);

        if (mdFiles.length === 0) return callback(null, []);

        const results = [];
        for (const f of mdFiles) {
            const full = path.join(POSTS_DIR, f.file);
            const readResult = readMdFile(full);
            if (!readResult) continue;

            const { text, entry } = readResult;
            entry.file = f.file;
            entry.category = f.category; // 子目录名，根目录文件为 null
            entry.content = text;

            // 默认日期：文件修改时间
            if (!entry.date) {
                try {
                    entry.date = fs.statSync(full).mtime.toISOString().slice(0, 10);
                } catch (e) {
                    entry.date = '';
                }
            }

            // 根目录下的 .md 文件才应用 posts.json 覆盖
            if (!f.category) {
                const override = manifest[f.file];
                if (override) {
                    if (override.title) entry.title = override.title;
                    if (override.date) entry.date = override.date;
                    if (Array.isArray(override.tags) && override.tags.length) entry.tags = override.tags;
                }
            }

            results.push(entry);
        }

        results.sort((a, b) => String(a.date).localeCompare(String(b.date)));
        callback(null, results);
    } catch (err) {
        callback(err);
    }
}

// 把扫描结果写成 posts-data.js
function writeSnapshot(callback) {
    collectPosts((err, list) => {
        if (err) {
            if (callback) callback(err);
            return;
        }
        const payload = 'window.POSTS_DATA = ' + JSON.stringify(list, null, 0) + ';\n';
        fs.writeFile(OUT_FILE, payload, 'utf8', writeErr => {
            if (callback) callback(writeErr || null, list);
        });
    });
}

module.exports = { collectPosts, writeSnapshot, POSTS_DIR, OUT_FILE };

// 直接运行本文件时，执行一次生成
if (require.main === module) {
    writeSnapshot((err, list) => {
        if (err) {
            console.error('生成 posts-data.js 失败：', err.message);
            process.exit(1);
        }
        console.log('已生成 posts-data.js，共 ' + list.length + ' 篇文章：');
        list.forEach(p => console.log('  [' + (p.category || '未分类') + '] ' + p.title + '  (' + p.date + ')'));
    });
}
