# Chavez Poon 個人網站｜繁體中文版

這個資料夾存放 Chavez Poon 個人網站的香港繁體中文版。目前中文版處於建設階段，`index.html` 是「網站建設中」頁面；日後可在此加入已翻譯的首頁、履歷、作品集、網誌及其他頁面。

中文版沿用網站的黑色背景、動態星塵效果及終端機風格開機畫面，並提供連往英文網站的語言切換功能。

## 使用技術

- **HTML5**：網頁結構及內容。
- **CSS3**：版面、響應式設計、終端機開機畫面及動畫。
- **JavaScript**：開機指令動畫、裝置及瀏覽器資訊顯示、星塵背景和語言切換功能。
- **TypeScript**：中文版開機畫面及終端機尺寸調整程式的原始碼；瀏覽器實際載入 `assets/js/` 內的 JavaScript 檔案。

網站是靜態網頁，不需要前端框架、伺服器端程式或建置工具。

## 開機畫面

訪客在同一瀏覽器工作階段首次直接進入中文版首頁時，Linux 終端機風格的開機畫面會詢問是否進入網站。輸入 `y` 會啟動頁面，並在系統就緒訊息前顯示由 0% 至 100% 的現代綠色進度列。輸入 `n` 會先顯示網站即將關閉的提示，再嘗試關閉分頁；瀏覽器可能會阻止網站關閉非由它開啟的分頁，此時終端機會提示訪客手動關閉。輸入其他字元會顯示指令無效訊息，並可重新輸入。重新載入或在網站內瀏覽時不會再次詢問。開機指令亦會在瀏覽器允許的情況下顯示裝置、作業系統及瀏覽器資訊；若訪客啟用了減少動態效果，動畫會縮短。

## 主要檔案

- `index.html` — 繁體中文版建設中頁面。
- `assets/css/under-construction.css` — 中文頁面的版面與開機畫面樣式。
- `assets/js/boot-screen.js` — 繁體中文終端機開機動畫。
- `assets/js/boot-terminal-sizing.js` — 調整開機終端機尺寸。
- `assets/ts/boot-screen.ts` — 開機動畫的 TypeScript 原始碼。
- `assets/ts/boot-terminal-sizing.ts` — 終端機尺寸程式的 TypeScript 原始碼。
- `../assets/js/language-nav.js`、`../assets/css/language-nav.css` — 中英文語言切換列。
- `../assets/js/gallery-background.js` — 動態星塵背景。
- `../assets/js/site-clock.js` — 自動顯示版權年份。
- `../assets/favicon/favicon.svg` — 網站圖示。

## 本機預覽

請在網站根目錄啟動靜態網頁伺服器，例如：

```sh
python3 -m http.server 8000
```

然後在瀏覽器開啟 <http://localhost:8000/zh-hk/>。

## 語言切換

頁面右上角的地球圖示會開啟語言選單。選擇「English」會在目前分頁前往 <https://www.chavezpoon.com>；英文網站的「中文」選項則會在目前分頁開啟 `/zh-hk`。訪客毋須手動重新整理。

## 發佈網站

發佈時請把整個網站根目錄及其子資料夾一併上載至靜態網站主機，並保留 `zh-hk/` 與根目錄 `assets/` 的相對位置。此頁可透過 GitHub Pages、Netlify、Vercel 或 GitLab Pages 發佈；不需要設定建置指令，發佈目錄使用儲存庫根目錄即可。

使用以下按鈕前往各平台的發佈流程或設定說明：

[![部署至 GitHub Pages](https://img.shields.io/badge/%E9%83%A8%E7%BD%B2-GitHub%20Pages-181717?logo=github&logoColor=white)](https://docs.github.com/en/pages/quickstart)
[![部署至 Netlify](https://img.shields.io/badge/%E9%83%A8%E7%BD%B2-Netlify-00C7B7?logo=netlify&logoColor=white)](https://app.netlify.com/start)
[![部署至 Vercel](https://img.shields.io/badge/%E9%83%A8%E7%BD%B2-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/new)
[![部署至 GitLab Pages](https://img.shields.io/badge/%E9%83%A8%E7%BD%B2-GitLab%20Pages-FC6D26?logo=gitlab&logoColor=white)](https://docs.gitlab.com/user/project/pages/)

## 新增中文版頁面

1. 在 `zh-hk/` 建立相應的 HTML 頁面，並使用香港繁體中文內容。
2. 將中文版專用樣式放在 `zh-hk/assets/css/`；中文版專用 JavaScript 及 TypeScript 分別放在 `zh-hk/assets/js/` 和 `zh-hk/assets/ts/`。
3. 共用的網站圖示、語言切換器及背景程式繼續使用根目錄 `assets/` 內的檔案。
4. 在每個中文版頁面加入語言切換器的 CSS 和 JavaScript，並使用正確的相對路徑。
5. 建立英文與中文版的對應頁面連結，並在本 README 更新新增頁面的說明。

編輯 TypeScript 後，請將變更編譯至相對應的 JavaScript 檔案，瀏覽器才會載入最新版本。
