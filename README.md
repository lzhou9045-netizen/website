# 个人网站：博客与资源入口

这是一个零依赖静态个人网站，适合部署到 Cloudflare Pages 或 Workers Static Assets。公开站点负责展示博客、项目记录和资源入口；NAS 文件入口通过 Cloudflare Tunnel 暴露到 `files.zlme.ren`，并由 Cloudflare Access 和 AList 登录共同保护。

## 项目结构

- `public/`：Cloudflare 实际发布目录，只包含网页和静态资源。
- `public/index.html`：主页，包含博客入口、资源入口和部署架构说明。
- `public/posts/domain-nas-site.html`：第一篇静态博客文章，也是上线操作索引。
- `public/styles.css` / `public/script.js`：页面样式和基础配置。
- `public/_headers`：Cloudflare 基础安全响应头，无 BOM。
- `public/_redirects`：把 `www.zlme.ren` 统一重定向到 `zlme.ren`。
- `wrangler.jsonc`：Wrangler 部署配置，指定静态资源目录为 `public`。
- `.assetsignore`：防止 `.git`、`.wrangler`、文档和 NAS 模板被当作网页资源上传。
- `nas/docker-compose.yml`：NAS 上运行 AList 与 cloudflared 的模板。
- `docs/deployment.md`：从域名、Pages、Tunnel 到访问保护的实施清单。

## 本地预览

建议从 `public` 目录预览：

```powershell
cd public
python -m http.server 8787
```

然后访问 `http://127.0.0.1:8787`。

## 上线前需要替换

在 `public/script.js` 中修改：

```js
const siteConfig = {
  siteUrl: "https://zlme.ren",
  filesUrl: "https://files.zlme.ren",
  panUrl: "https://pan.baidu.com",
  githubUrl: "https://github.com/",
  email: "lzhou9045@gmail.com"
};
```

在 HTML 中如需修改网站名称，也可以直接搜索 `我的个人空间`。

## 部署路线

1. 阿里云域名注册保持不变，把 DNS nameserver 切到 Cloudflare。
2. Cloudflare 连接 GitHub 仓库 `lzhou9045-netizen/website`。
3. 如果使用 Pages：Build command 留空，Build output directory 设为 `public`。
4. 如果 Cloudflare 使用 `npx wrangler deploy`：保留即可，`wrangler.jsonc` 已指定 `assets.directory` 为 `./public`。
5. 为项目添加 `zlme.ren` 和 `www.zlme.ren`。
6. NAS 上按 `nas/docker-compose.yml` 启动 AList 与 cloudflared。
7. Cloudflare Zero Trust 中把 `files.zlme.ren` 指向 Tunnel 服务 `http://alist:5244`。
8. Cloudflare Access 保护 `files.zlme.ren`，只允许你的邮箱或指定邮箱访问。

更完整的执行清单见 `docs/deployment.md`。