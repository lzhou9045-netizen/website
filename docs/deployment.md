# 部署清单

## 1. 域名与 DNS

1. 在 Cloudflare 添加阿里云注册的域名。
2. Cloudflare 会给出两个 nameserver。
3. 到阿里云域名控制台，把 DNS 服务器改成 Cloudflare 提供的 nameserver。
4. 等待 DNS 生效。

建议记录：

```text
主域名：example.com
Pages：example.pages.dev
资源入口：files.example.com
Cloudflare 账号邮箱：your-email@example.com
```

## 2. Cloudflare Pages

1. 建 GitHub 仓库并提交本项目。
2. Cloudflare Pages 选择该仓库。
3. 构建设置：
   - Framework preset: None
   - Build command: 留空
   - Build output directory: `/`
4. 添加自定义域名：
   - `example.com`
   - `www.example.com`
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
Hostname: files.example.com
Service:  http://alist:5244
```

确认 DNS 中出现指向 `<UUID>.cfargotunnel.com` 的 CNAME。

## 5. Cloudflare Access

1. 新建 Self-hosted application。
2. Application domain 填 `files.example.com`。
3. Policy 建议：
   - Action: Allow
   - Include: 指定邮箱或邮箱域名
4. 访问 `https://files.example.com`，确认先出现 Cloudflare Access 登录。

## 6. 验收

- `https://example.com` 能打开首页。
- `https://www.example.com` 能打开或跳转到首页。
- `https://files.example.com` 未登录时不能直接进入 AList。
- 登录后能看到指定 NAS 目录和百度网盘资源。
- 手机关闭 Wi-Fi 后仍能访问主页和登录资源入口。
- 停止 `cloudflared` 后，主页仍可访问，只有资源入口不可用。
