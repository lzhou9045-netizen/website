# 閮ㄧ讲娓呭崟

## 1. 鍩熷悕涓?DNS

1. 鍦?Cloudflare 娣诲姞闃块噷浜戞敞鍐岀殑鍩熷悕 `zlme.ren`銆?2. Cloudflare 浼氱粰鍑轰袱涓?nameserver銆?3. 鍒伴樋閲屼簯鍩熷悕鎺у埗鍙帮紝鎶?DNS 鏈嶅姟鍣ㄦ敼鎴?Cloudflare 鎻愪緵鐨?nameserver銆?4. 绛夊緟 DNS 鐢熸晥銆?
寤鸿璁板綍锛?
```text
涓诲煙鍚嶏細zlme.ren
Pages/Workers 椤圭洰锛歾lme-ren
璧勬簮鍏ュ彛锛歠iles.zlme.ren
Cloudflare 璐﹀彿閭锛歭zhou9045@gmail.com
GitHub 浠撳簱锛歭zhou9045-netizen/website
```

## 2. Cloudflare Pages / Workers Static Assets

1. Cloudflare 閫夋嫨 GitHub 浠撳簱 `lzhou9045-netizen/website`銆?2. 濡傛灉鏄?Pages 闈欐€佺珯閰嶇疆锛?   - Framework preset: None
   - Build command: 鐣欑┖
   - Build output directory: `public`
3. 濡傛灉 Cloudflare 鏄剧ず Deploy command 涓?`npx wrangler deploy`锛屼繚鐣欏嵆鍙紱浠撳簱閲岀殑 `wrangler.jsonc` 浼氭寚瀹氬彧鍙戝竷 `public` 鐩綍銆?4. 娣诲姞鑷畾涔夊煙鍚嶏細
   - `zlme.ren`
   - `www.zlme.ren`
5. 閮ㄧ讲鎴愬姛鍚庯紝璁块棶涓婚〉骞舵鏌ユ牱寮忋€佸浘鐗囥€佸崥瀹㈤摼鎺ュ拰璧勬簮鍏ュ彛閾炬帴銆?
## 3. NAS Docker 鏈嶅姟

1. 澶嶅埗 `nas/.env.example` 涓?NAS 涓婄殑 `.env`銆?2. 鍦?Cloudflare Zero Trust 鍒涘缓 Tunnel锛屽鍒?token 鍒?`.env`銆?3. 鎸夊疄闄?NAS 鍏变韩鐩綍淇敼 `nas/docker-compose.yml` 涓殑 volume銆?4. 鍦?NAS 涓婂惎鍔細

```bash
docker compose up -d
```

5. 棣栨鐧诲綍 AList 鍚庯紝鍒涘缓绠＄悊鍛樿处鍙峰拰鍙璐﹀彿銆?6. 鍙寕杞介渶瑕佷粠鍏綉璁块棶鐨勭洰褰曞拰鐧惧害缃戠洏锛屼笉鎸傝浇 NAS 鏍圭洰褰曘€?
## 4. Cloudflare Tunnel

鍦?Cloudflare Zero Trust 鐨?Tunnel 涓坊鍔?Public hostname锛?
```text
Hostname: files.zlme.ren
Service:  http://alist:5244
```

纭 DNS 涓嚭鐜版寚鍚?`<UUID>.cfargotunnel.com` 鐨?CNAME銆?
## 5. Cloudflare Access

1. 鏂板缓 Self-hosted application銆?2. Application domain 濉?`files.zlme.ren`銆?3. Policy 寤鸿锛?   - Action: Allow
   - Include: 鎸囧畾閭鎴栭偖绠卞煙鍚?4. 璁块棶 `https://files.zlme.ren`锛岀‘璁ゅ厛鍑虹幇 Cloudflare Access 鐧诲綍銆?
## 6. 楠屾敹

- `https://zlme.ren` 鑳芥墦寮€棣栭〉銆?- `https://www.zlme.ren` 鑳借烦杞埌棣栭〉銆?- `https://files.zlme.ren` 鏈櫥褰曟椂涓嶈兘鐩存帴杩涘叆 AList銆?- 鐧诲綍鍚庤兘鐪嬪埌鎸囧畾 NAS 鐩綍鍜岀櫨搴︾綉鐩樿祫婧愩€?- 鎵嬫満鍏抽棴 Wi-Fi 鍚庝粛鑳借闂富椤靛拰鐧诲綍璧勬簮鍏ュ彛銆?- 鍋滄 `cloudflared` 鍚庯紝涓婚〉浠嶅彲璁块棶锛屽彧鏈夎祫婧愬叆鍙ｄ笉鍙敤銆