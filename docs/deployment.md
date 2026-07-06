# 部署清单

## 1. 域名与 DNS

1. 在 Cloudflare 添加阿里云注册的域名 `zlme.ren`。
2. Cloudflare 会给出两个 nameserver。
3. 到阿里云域名控制台，把 DNS 服务器改成 Cloudflare 提供的 nameserver。
4. 等待 DNS 生效。

建议记录：

```text
主域名：zlme.ren
Pages/Workers 项目：zlme-ren
资源入口：files.zlme.ren
Cloudflare 账号邮箱：lzhou9045@gmail.com
GitHub 仓库：lzhou9045-netizen/website
```

## 2. Cloudflare Pages / Workers Static Assets

1. Cloudflare 选择 GitHub 仓库 `lzhou9045-netizen/website`。
2. 如果是 Pages 静态站配置：
   - Framework preset: None
   - Build command: 留空
   - Build output directory: `public`
3. 如果 Cloudflare 显示 Deploy command 为 `npx wrangler deploy`，保留即可；仓库里的 `wrangler.jsonc` 会指定只发布 `public` 目录。
4. 添加自定义域名：
   - `zlme.ren`
   - `www.zlme.ren`
5. 部署成功后，访问主页并检查样式、图片、博客链接和资源入口链接。

## 3. NAS Docker 服务

1. 复制 `nas/.env.example` 为 NAS 上的 `.env`。
2. 在 Cloudflare Zero Trust 创建 Tunnel，复制 token 到 `.env`。
3. 按实际 NAS 共享目录修改 `nas/docker-compose.yml` 中的 volume。
4. 在 NAS 上启动：

```bash
docker compose up -d
```

5. 首次登录 AList 后，创建管理员账号和只读账号。
6. 只挂载需要从公网访问的目录和百度网盘，不挂载 NAS 根目录。

## 4. Cloudflare Tunnel

在 Cloudflare Zero Trust 的 Tunnel 中添加 Public hostname：

```text
Hostname: files.zlme.ren
Service:  http://alist:5244
```

确认 DNS 中出现指向 `<UUID>.cfargotunnel.com` 的 CNAME。

## 5. Cloudflare Access

1. 新建 Self-hosted application。
2. Application domain 填 `files.zlme.ren`。
3. Policy 建议：
   - Action: Allow
   - Include: 指定邮箱或邮箱域名
4. 访问 `https://files.zlme.ren`，确认先出现 Cloudflare Access 登录。

## 6. 验收

- `https://zlme.ren` 能打开首页。
- `https://www.zlme.ren` 能跳转到首页。
- `https://files.zlme.ren` 未登录时不能直接进入 AList。
- 登录后能看到指定 NAS 目录和百度网盘资源。
- 手机关闭 Wi-Fi 后仍能访问主页和登录资源入口。
- 停止 `cloudflared` 后，主页仍可访问，只有资源入口不可用。