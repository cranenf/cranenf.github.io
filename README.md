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
