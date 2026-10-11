// ===== Markdown 渲染 =====
// 支持：标题、分隔线、引用、围栏代码块、表格、有序/无序列表（含一级嵌套）、
//       粗体、斜体、行内代码、链接、图片、LaTeX 行内与块级公式
function simpleMarkdown(md) {
    let src = String(md == null ? '' : md).replace(/^\uFEFF/, '');

    // ---------- 工具函数 ----------
    function escapeHtml(t) {
        return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    // 数学公式里的 & < > 需要转成实体，保证 HTML 结构不被破坏，
    // MathJax 读取的是解码后的文本，所以公式本身不受影响
    function escapeMath(t) {
        return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ---------- 1. 暂存不能被后续处理破坏的内容 ----------
    const store = [];
    function stash(html) {
        store.push(html);
        return '\u0000' + (store.length - 1) + '\u0000';
    }

    // 围栏代码块
    src = src.replace(/```[^\n]*\n([\s\S]*?)```/g, function (m, code) {
        return stash('<pre><code>' + escapeHtml(code.replace(/\n$/, '')) + '</code></pre>');
    });

    // 块级公式 $$...$$
    src = src.replace(/\$\$([\s\S]*?)\$\$/g, function (m, tex) {
        return stash('$$' + escapeMath(tex) + '$$');
    });

    // 行内公式 $...$（不跨行）
    src = src.replace(/\$([^\n$]+?)\$/g, function (m, tex) {
        return stash('$' + escapeMath(tex) + '$');
    });

    // 行内代码 `...`
    src = src.replace(/`([^`\n]+)`/g, function (m, code) {
        return stash('<code>' + escapeHtml(code) + '</code>');
    });

    // ---------- 2. 转义剩余的 HTML ----------
    // 引用块的行首 ">" 必须先换成哨兵字符：否则会被转义成 &gt;，块解析阶段就认不出来了
    src = src.replace(/^([ \t]*)>[ \t]?/gm, '$1\u0001');
    src = escapeHtml(src);

    // ---------- 3. 行内格式 ----------
    function inline(text) {
        return text
            // 粗体（先于斜体）
            .replace(/\*\*([^\n]+?)\*\*/g, '<strong>$1</strong>')
            // 斜体：避免误伤 ** 和单独的 *
            .replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>')
            // 图片必须放在链接前面处理，且 alt 允许为空（![](...) 是合法的）
            .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
                '<img src="$2" alt="$1" referrerpolicy="no-referrer">')
            // 链接
            .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }

    // ---------- 4. 块级解析 ----------
    const lines = src.split('\n');
    const out = [];
    const listStack = [];   // [{type, indent}]
    let para = [];

    function flushPara() {
        if (para.length) {
            out.push('<p>' + inline(para.join('<br>')) + '</p>');
            para = [];
        }
    }
    function closeLists() {
        while (listStack.length) {
            out.push('</' + listStack.pop().type + '>');
        }
    }
    function isStash(line) {
        return /^\u0000\d+\u0000$/.test(line);
    }

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        const line = raw.trim();

        // 空行：结束段落；若后面不是列表项则结束列表
        if (!line) {
            flushPara();
            if (listStack.length) {
                let j = i + 1;
                while (j < lines.length && !lines[j].trim()) j++;
                const next = j < lines.length ? lines[j] : '';
                if (!/^\s*([-*+]|\d+\.)\s+/.test(next)) closeLists();
            }
            continue;
        }

        // 暂存块（代码块 / 块级公式）独立成段
        if (isStash(line)) {
            flushPara();
            closeLists();
            out.push(line);
            continue;
        }

        // 分隔线
        if (/^(\*{3,}|-{3,}|_{3,})$/.test(line)) {
            flushPara(); closeLists();
            out.push('<hr>');
            continue;
        }

        // 标题
        const hm = line.match(/^(#{1,6})\s+(.*)$/);
        if (hm) {
            flushPara(); closeLists();
            const lv = hm[1].length;
            out.push('<h' + lv + '>' + inline(hm[2]) + '</h' + lv + '>');
            continue;
        }

        // 引用（行首标记已换成 \u0001，避免被 HTML 转义破坏）
        if (/^\u0001/.test(line)) {
            flushPara(); closeLists();
            const buf = [];
            while (i < lines.length && /^\s*\u0001/.test(lines[i])) {
                buf.push(lines[i].trim().replace(/^\u0001/, ''));
                i++;
            }
            i--;
            out.push('<blockquote>' + inline(buf.join('<br>')) + '</blockquote>');
            continue;
        }

        // 表格：当前行含 |，且下一行是分隔行
        if (line.indexOf('|') >= 0 && i + 1 < lines.length &&
            /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(lines[i + 1]) &&
            lines[i + 1].indexOf('|') >= 0) {
            flushPara(); closeLists();
            const splitCells = function (l) {
                return l.replace(/^\s*\|/, '').replace(/\|\s*$/, '')
                        .split('|').map(function (s) { return s.trim(); });
            };
            const head = splitCells(line);
            i += 2;
            const rows = [];
            while (i < lines.length && lines[i].trim() && lines[i].indexOf('|') >= 0) {
                rows.push(splitCells(lines[i]));
                i++;
            }
            i--;
            let t = '<table><thead><tr>' +
                head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') +
                '</tr></thead><tbody>';
            rows.forEach(function (r) {
                t += '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
            });
            t += '</tbody></table>';
            out.push(t);
            continue;
        }

        // 列表项（支持缩进嵌套）
        const lm = raw.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
        if (lm) {
            flushPara();
            const indent = lm[1].replace(/\t/g, '    ').length;
            const type = /\d+\./.test(lm[2]) ? 'ol' : 'ul';

            while (listStack.length && indent < listStack[listStack.length - 1].indent) {
                out.push('</' + listStack.pop().type + '>');
            }
            const top = listStack[listStack.length - 1];
            if (!top) {
                listStack.push({ type: type, indent: indent });
                out.push('<' + type + '>');
            } else if (indent > top.indent) {
                listStack.push({ type: type, indent: indent });
                out.push('<' + type + '>');
            } else if (top.type !== type) {
                out.push('</' + listStack.pop().type + '>');
                listStack.push({ type: type, indent: indent });
                out.push('<' + type + '>');
            }
            out.push('<li>' + inline(lm[3]) + '</li>');
            continue;
        }

        // 普通段落行
        para.push(line);
    }
    flushPara();
    closeLists();

    // ---------- 5. 还原暂存内容 ----------
    return out.join('\n').replace(/\u0000(\d+)\u0000/g, function (m, n) {
        return store[Number(n)] !== undefined ? store[Number(n)] : '';
    });
}

// ===== 当前状态 =====
let currentView = 'home'; // 'home' | 'categoryList' | 'postList' | 'postDetail' | 'intro'
let currentCategory = null;
let currentPostId = null;
let blogPosts = []; // 将从 posts/ 目录加载，每项含 category 字段

// ===== DOM 元素 =====
const homeContent = document.getElementById('homeContent');
const blogListDiv = document.getElementById('blogList');
const blogDetailDiv = document.getElementById('blogDetail');
const blogContent = document.getElementById('blogContent');
const markdownContent = document.getElementById('markdownContent');
const placeholder = document.getElementById('placeholder');
const backBtn = document.getElementById('backBtn');
const navLinks = document.querySelectorAll('.nav-link');

// ===== 获取分类显示名 =====
const CATEGORY_NAMES = {
    '研究性学习': '研究性学习',
    '题解': '题解',
    '游记': '游记',
    '个人笔记': '个人笔记'
};
function getCategoryDisplay(cat) {
    if (!cat) return '其他';
    return CATEGORY_NAMES[cat] || cat;
}

// ===== 加载博客数据 =====
// 三种数据来源，按优先级依次尝试：
//   1. /api/posts        本地服务器实时扫描 posts/ 目录（最新，扔文件即生效）
//   2. window.POSTS_DATA 由 build-posts.js 生成的 posts-data.js 快照
//                        （直接双击 index.html 打开时用这个，正文已内嵌）
//   3. posts/posts.json  静态清单（部署到纯静态托管时的兜底）
async function loadBlogList() {
    let postsMeta = null;

    // 方式一：服务器目录扫描接口
    try {
        const apiRes = await fetch('./api/posts');
        if (apiRes.ok) {
            const data = await apiRes.json();
            if (Array.isArray(data) && data.length > 0) {
                postsMeta = data;
            }
        }
    } catch (e) {
        // 没有接口（例如 file:// 直接打开），走后面的方式
    }

    // 方式二：内嵌快照（正文已经包含在里面，不需要再 fetch）
    if (!postsMeta && Array.isArray(window.POSTS_DATA) && window.POSTS_DATA.length > 0) {
        blogPosts = window.POSTS_DATA.map(function (p, i) {
            // 从 file 路径推断分类（子目录名），兼容 / 和 \ 两种路径分隔符
            var file = String(p.file || '');
            var category = null;
            if (file.indexOf('/') >= 0) {
                category = file.split('/')[0];
            } else if (file.indexOf('\\') >= 0) {
                category = file.split('\\')[0];
            }
            return {
                id: i + 1,
                title: p.title || file.replace(/\.md$/, ''),
                date: p.date || '',
                tags: p.tags || [],
                content: String(p.content || '').replace(/^\uFEFF/, ''),
                filename: file,
                category: p.category || category
            };
        });
        renderCategoryList();
        return;
    }

    // 方式三：静态清单 posts.json + 逐个抓取正文
    if (!postsMeta) {
        try {
            const metaRes = await fetch('./posts/posts.json');
            if (metaRes.ok) {
                postsMeta = await metaRes.json();
            }
        } catch (e) {
            console.log('加载 posts.json 失败:', e);
        }
    }

    if (!postsMeta) {
        blogPosts = [];
        renderCategoryList();
        return;
    }

    // 逐个加载文章正文
    blogPosts = [];
    // 注意：posts.json 不含 category，子目录的文章通过 file 路径中是否含 / 来判断
    for (let i = 0; i < postsMeta.length; i++) {
        const meta = postsMeta[i];
        try {
            const contentRes = await fetch('./posts/' + encodeURIComponent(meta.file));
            if (!contentRes.ok) continue;
            const content = (await contentRes.text()).replace(/^\uFEFF/, '');
            const parts = meta.file.split('/');
            const category = parts.length > 1 ? parts[0] : null;
            blogPosts.push({
                id: blogPosts.length + 1,
                title: meta.title || meta.file.replace(/\.md$/, ''),
                date: meta.date || '',
                tags: meta.tags || [],
                content: content,
                filename: meta.file,
                category: meta.category || category
            });
        } catch (e) {
            console.log('加载文章失败: ' + meta.file);
        }
    }
    renderCategoryList();
}

// ===== 渲染分类列表（博客的首页） =====
function renderCategoryList() {
    currentView = 'categoryList';
    // 从 blogPosts 中提取所有不重复的分类
    const catMap = {};
    blogPosts.forEach(function(p) {
        const cat = p.category || '__uncategorized__';
        if (!catMap[cat]) {
            catMap[cat] = { name: cat, posts: [], count: 0 };
        }
        catMap[cat].posts.push(p);
        catMap[cat].count++;
    });

    const categories = Object.keys(catMap).sort();
    if (categories.length === 0) {
        blogListDiv.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">暂无博客文章</p>';
        return;
    }

    let html = '<h2 style="margin-bottom:20px;">博客分类</h2>';
    categories.forEach(function(key) {
        const c = catMap[key];
        const displayName = getCategoryDisplay(c.name === '__uncategorized__' ? null : c.name);
        html += `
            <div class="blog-card category-card" data-category="${c.name}">
                <h3>${displayName}</h3>
                <div class="blog-meta">共 ${c.count} 篇文章</div>
            </div>
        `;
    });
    blogListDiv.innerHTML = html;

    // 绑定点击事件
    document.querySelectorAll('.category-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const cat = this.getAttribute('data-category');
            showCategoryPosts(cat === '__uncategorized__' ? null : cat);
        });
    });
}

// ===== 显示某个分类下的文章列表 =====
function showCategoryPosts(category) {
    currentView = 'postList';
    currentCategory = category;
    const filtered = blogPosts.filter(function(p) {
        return (p.category || '__uncategorized__') === (category || '__uncategorized__');
    });

    if (filtered.length === 0) {
        blogListDiv.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">暂无文章</p>';
        return;
    }

    const displayName = getCategoryDisplay(category);
    let html = '<div style="margin-bottom:16px;">';
    html += '<button class="btn-back" id="backToCategoryBtn">← 返回分类列表</button>';
    html += '</div>';
    html += '<h2 style="margin-bottom:20px;">' + displayName + '</h2>';

    filtered.forEach(function(post) {
        const metaParts = [];
        if (post.date) metaParts.push(post.date);
        if (post.tags && post.tags.length) metaParts.push(post.tags.join(' · '));
        html += `
            <div class="blog-card" data-id="${post.id}">
                <h3>${post.title}</h3>
                <div class="blog-meta">${metaParts.join(' · ')}</div>
            </div>
        `;
    });
    blogListDiv.innerHTML = html;

    // 绑定返回分类列表
    const backCatBtn = document.getElementById('backToCategoryBtn');
    if (backCatBtn) {
        backCatBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            renderCategoryList();
        });
    }

    // 绑定点击进入文章详情
    document.querySelectorAll('.blog-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            showBlogDetail(id);
        });
    });

    // blogListDiv 已经是可见的，不需要再切换 display
}

// ===== 显示博客详情 =====
function showBlogDetail(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    currentView = 'postDetail';
    currentPostId = id;
    blogContent.innerHTML = simpleMarkdown(post.content);
    blogListDiv.style.display = 'none';
    blogDetailDiv.style.display = 'block';
    markdownContent.style.display = 'none';
    placeholder.style.display = 'none';
    homeContent.style.display = 'none';
    // 触发 MathJax 重新渲染新插入的数学公式
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([blogContent]).catch(function(err) {
            console.log('MathJax typeset error:', err);
        });
    }
}

// ===== 显示首页 =====
async function showHome() {
    currentView = 'home';
    blogListDiv.style.display = 'none';
    blogDetailDiv.style.display = 'none';
    markdownContent.style.display = 'none';
    placeholder.style.display = 'none';
    await loadHome();
}

// ===== 加载首页 =====
async function loadHome() {
    try {
        const res = await fetch('./首页.md');
        if (res.ok) {
            const md = await res.text();
            homeContent.innerHTML = simpleMarkdown(md);
            homeContent.style.display = 'block';
            if (window.MathJax && MathJax.typesetPromise) {
                MathJax.typesetPromise([homeContent]).catch(function(err) {
                    console.log('MathJax typeset error:', err);
                });
            }
            return;
        }
    } catch (e) {
        // 降级：用内联内容
    }
    homeContent.innerHTML = simpleMarkdown('## 首页\n\n欢迎来到我的个人网站。');
    homeContent.style.display = 'block';
}

// ===== 显示个人介绍 =====
function showIntro() {
    currentView = 'intro';
    homeContent.style.display = 'none';
    blogListDiv.style.display = 'none';
    blogDetailDiv.style.display = 'none';
    markdownContent.style.display = 'block';
    placeholder.style.display = 'none';
}

// ===== 渲染个人介绍 =====
let introMD = `此处写入介绍`;
function renderIntro() {
    markdownContent.innerHTML = simpleMarkdown(introMD);
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([markdownContent]).catch(function(err) {
            console.log('MathJax typeset error:', err);
        });
    }
}
renderIntro();

// ===== 返回按钮（在文章详情页） =====
backBtn.addEventListener('click', function() {
    // 返回当前分类的文章列表
    if (currentCategory !== null) {
        renderCategoryList(); // 简单处理：回到分类列表
    } else {
        renderCategoryList();
    }
    blogDetailDiv.style.display = 'none';
    blogListDiv.style.display = 'block';
});

// ===== 导航栏点击切换 =====
navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        if (page === 'home') {
            showHome();
        } else if (page === 'blog') {
            // 切换到博客：显示分类列表
            homeContent.style.display = 'none';
            blogDetailDiv.style.display = 'none';
            markdownContent.style.display = 'none';
            placeholder.style.display = 'none';
            renderCategoryList();
            blogListDiv.style.display = 'block';
        } else {
            // 个人兴趣 & 个人项目 → 占位
            homeContent.style.display = 'none';
            blogListDiv.style.display = 'none';
            blogDetailDiv.style.display = 'none';
            markdownContent.style.display = 'none';
            placeholder.style.display = 'block';
        }
    });
});

// ===== 初始化 =====
showHome();
loadBlogList();
