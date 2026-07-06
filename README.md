# 个人网站：博客与资源入口

这是一个零依赖静态个人网站，适合部署到 Cloudflare Pages。公开站点负责展示博客、项目记录和资源入口；NAS 文件入口通过 Cloudflare Tunnel 暴露到 `files.zlme.ren`，并由 Cloudflare Access 和 AList 登录共同保护。

## 项目结构

- `index.html`：主页，包含博客入口、资源入口和部署架构说明。
- `posts/domain-nas-site.html`：第一篇静态博客文章，也是上线操作索引。
- `styles.css` / `script.js`：页面样式和基础配置。
- `nas/docker-compose.yml`：NAS 上运行 AList 与 cloudflared 的模板。
- `nas/.env.example`：Tunnel Token 等环境变量示例。
- `_headers`：Cloudflare Pages 的基础安全响应头。
- `_redirects`：把 `www.zlme.ren` 统一重定向到 `zlme.ren`。
- `docs/deployment.md`：从域名、Pages、Tunnel 到访问保护的实施清单。

## 本地预览

直接打开 `index.html` 即可预览。也可以用本地 HTTP 服务：

```powershell
python -m http.server 8787
```

然后访问 `http://127.0.0.1:8787`。

## 上线前需要替换

在 `script.js` 中修改：

```js
const siteConfig = {
  siteUrl: "https://zlme.ren",
  filesUrl: "https://files.zlme.ren",
  panUrl: "https://pan.baidu.com",
  githubUrl: "https://github.com/",
  email: "hello@zlme.ren"
};
```

在 HTML 中如需修改网站名称，也可以直接搜索 `我的个人空间`。

## 部署路线

1. 阿里云域名注册保持不变，把 DNS nameserver 切到 Cloudflare。
2. Cloudflare Pages 连接 GitHub 仓库，Build command 留空，Output directory 设为 `/`。
3. 为 Pages 添加 `zlme.ren` 和 `www.zlme.ren`。
4. NAS 上按 `nas/docker-compose.yml` 启动 AList 与 cloudflared。
5. Cloudflare Zero Trust 中把 `files.zlme.ren` 指向 Tunnel 服务 `http://alist:5244`。
6. Cloudflare Access 保护 `files.zlme.ren`，只允许你的邮箱或指定邮箱访问。

更完整的执行清单见 `docs/deployment.md`。
