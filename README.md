# 涓汉缃戠珯锛氬崥瀹笌璧勬簮鍏ュ彛

杩欐槸涓€涓浂渚濊禆闈欐€佷釜浜虹綉绔欙紝閫傚悎閮ㄧ讲鍒?Cloudflare Pages 鎴?Workers Static Assets銆傚叕寮€绔欑偣璐熻矗灞曠ず鍗氬銆侀」鐩褰曞拰璧勬簮鍏ュ彛锛汵AS 鏂囦欢鍏ュ彛閫氳繃 Cloudflare Tunnel 鏆撮湶鍒?`files.zlme.ren`锛屽苟鐢?Cloudflare Access 鍜?AList 鐧诲綍鍏卞悓淇濇姢銆?
## 椤圭洰缁撴瀯

- `public/`锛欳loudflare 瀹為檯鍙戝竷鐩綍锛屽彧鍖呭惈缃戦〉鍜岄潤鎬佽祫婧愩€?- `public/index.html`锛氫富椤碉紝鍖呭惈鍗氬鍏ュ彛銆佽祫婧愬叆鍙ｅ拰閮ㄧ讲鏋舵瀯璇存槑銆?- `public/posts/domain-nas-site.html`锛氱涓€绡囬潤鎬佸崥瀹㈡枃绔狅紝涔熸槸涓婄嚎鎿嶄綔绱㈠紩銆?- `public/styles.css` / `public/script.js`锛氶〉闈㈡牱寮忓拰鍩虹閰嶇疆銆?- `public/_headers`锛欳loudflare 鍩虹瀹夊叏鍝嶅簲澶达紝鏃?BOM銆?- `public/_redirects`锛氭妸 `www.zlme.ren` 缁熶竴閲嶅畾鍚戝埌 `zlme.ren`銆?- `wrangler.jsonc`锛歐rangler 閮ㄧ讲閰嶇疆锛屾寚瀹氶潤鎬佽祫婧愮洰褰曚负 `public`銆?- `.assetsignore`锛氶槻姝?`.git`銆乣.wrangler`銆佹枃妗ｅ拰 NAS 妯℃澘琚綋浣滅綉椤佃祫婧愪笂浼犮€?- `nas/docker-compose.yml`锛歂AS 涓婅繍琛?AList 涓?cloudflared 鐨勬ā鏉裤€?- `docs/deployment.md`锛氫粠鍩熷悕銆丳ages銆乀unnel 鍒拌闂繚鎶ょ殑瀹炴柦娓呭崟銆?
## 鏈湴棰勮

寤鸿浠?`public` 鐩綍棰勮锛?
```powershell
cd public
python -m http.server 8787
```

鐒跺悗璁块棶 `http://127.0.0.1:8787`銆?
## 涓婄嚎鍓嶉渶瑕佹浛鎹?
鍦?`public/script.js` 涓慨鏀癸細

```js
const siteConfig = {
  siteUrl: "https://zlme.ren",
  filesUrl: "https://files.zlme.ren",
  panUrl: "https://pan.baidu.com",
  githubUrl: "https://github.com/",
  email: "lzhou9045@gmail.com"
};
```

鍦?HTML 涓闇€淇敼缃戠珯鍚嶇О锛屼篃鍙互鐩存帴鎼滅储 `鎴戠殑涓汉绌洪棿`銆?
## 閮ㄧ讲璺嚎

1. 闃块噷浜戝煙鍚嶆敞鍐屼繚鎸佷笉鍙橈紝鎶?DNS nameserver 鍒囧埌 Cloudflare銆?2. Cloudflare 杩炴帴 GitHub 浠撳簱 `lzhou9045-netizen/website`銆?3. 濡傛灉浣跨敤 Pages锛欱uild command 鐣欑┖锛孊uild output directory 璁句负 `public`銆?4. 濡傛灉 Cloudflare 浣跨敤 `npx wrangler deploy`锛氫繚鐣欏嵆鍙紝`wrangler.jsonc` 宸叉寚瀹?`assets.directory` 涓?`./public`銆?5. 涓洪」鐩坊鍔?`zlme.ren` 鍜?`www.zlme.ren`銆?6. NAS 涓婃寜 `nas/docker-compose.yml` 鍚姩 AList 涓?cloudflared銆?7. Cloudflare Zero Trust 涓妸 `files.zlme.ren` 鎸囧悜 Tunnel 鏈嶅姟 `http://alist:5244`銆?8. Cloudflare Access 淇濇姢 `files.zlme.ren`锛屽彧鍏佽浣犵殑閭鎴栨寚瀹氶偖绠辫闂€?
鏇村畬鏁寸殑鎵ц娓呭崟瑙?`docs/deployment.md`銆