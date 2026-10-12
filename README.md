# 我的个人网站

## 本地使用
直接用浏览器打开 `index.html` 即可预览。

由于浏览器安全策略，本地直接打开 `index.html` 时 `fetch('intro.md')` 可能会失败。
**建议方案：**
1. 使用 VS Code 的 Live Server 插件打开
2. 或使用 Python 启动一个本地服务器：
   ```
   python -m http.server 8000
   ```
   然后访问 http://localhost:8000

## 部署到 GitHub Pages
1. 在 GitHub 创建仓库
2. 将所有文件上传到仓库 main 分支
3. 进入 Settings → Pages，Source 选择 main 分支
4. 访问 `https://<你的用户名>.github.io/<仓库名>/`

## 功能说明
- **导航栏**：博客 / 个人兴趣 / 个人项目（点击后显示占位）
- **更换头像**：点击"更换头像"按钮选择图片
- **更换背景**：点击"更换背景"按钮选择图片
- **介绍文档**：修改 `intro.md` 文件即可更新主页介绍内容
- **博客评论区**：每篇文章底部集成 giscus 评论区（基于 GitHub Discussions）

---

## 启用 Giscus 评论区（重要！）

本网站已集成 [giscus](https://giscus.app/zh-CN) 评论系统，但需要你在 GitHub 上完成以下设置才能正常使用：

### 步骤 1：启用仓库 Discussions
1. 打开 GitHub 仓库 `cranenf/cranenf.github.io`
2. 进入 **Settings** → 向下滚动找到 **Features**
3. 勾选 **Discussions** ✅
4. 点击 Save

### 步骤 2：创建 Discussion 分类
1. 进入仓库的 **Discussions** 页面（顶部导航栏）
2. 如果还没有分类，按照 GitHub 提示创建一个
3. **创建一个名为 "Announcements" 的分类**（或使用已有分类名）
4. 记录下该分类的 ID

### 步骤 3：获取分类 ID 并修改配置
打开 `script.js`，找到 `GISCUS_CONFIG` 对象：
```js
const GISCUS_CONFIG = {
    'data-repo': 'cranenf/cranenf.github.io',
    'data-repo-id': 'R_kgDOVE2Cfw',
    'data-category': 'Announcements',
    'data-category-id': 'DIC_kwDOVE2Cf84Cj0c5',  // ← 替换为你的分类 ID
    'data-mapping': 'specific',
    // ...
};
```

**如何获取分类 ID：**
1. 访问 `https://api.github.com/repos/cranenf/cranenf.github.io/categories`（需要先启用 Discussions）
2. 或在浏览器打开 giscus.app，选完仓库和分类后，页面会自动生成完整的嵌入代码，从中复制 `data-category-id` 的值

### 步骤 4：安装 giscus GitHub App
1. 访问 https://github.com/apps/giscus
2. 点击 **Install** → 选择 `cranenf/cranenf.github.io` 仓库
3. 授权后即可

完成以上步骤后，访问文章详情页就能看到评论区了。
