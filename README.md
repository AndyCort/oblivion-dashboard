# 未央 · Oblivion Dashboard

React、TypeScript、Vite 与 styled-components 构建的个人展示空间，包含 Home、Now、Notes、Library 和 Moments。

## 本地开发

```sh
npm ci
npm run dev
```

使用支持当前 Vite 与 TypeScript 的 Node 环境；本轮验证环境为 Node 26.7.0。测试使用 Node 内置测试运行器与 TypeScript 类型剥离，无额外测试依赖。

## 检查

```sh
npm run check
```

依次执行 lint、音源与 Moments 数据校验测试和 TypeScript 严格检查 / 生产构建。单独运行可使用 `npm run lint`、`npm test`、`npm run build`。

## 配置与数据

- `src/config/GlobalConfig.ts`：站点名称与播放器默认音源、曲名、歌手、封面。
- `src/config/theme.ts`：背景和浅色 / 深色主题。
- `src/config/nowContent.ts`：Now 的近况、关注方向与日常节奏。
- `src/config/notesContent.ts`：Notes 的精选笔记、主题随记与短句。
- `src/config/libraryContent.ts`：Library 的书籍、影乐推荐与阅读随记。
- `VITE_CMS_API_URL`：可选的公开 Moments API 地址；未配置时使用项目默认公开接口。Vite 环境变量会被打包到客户端，不应放入密钥。
- CMS 支持数组、`{ data: [] }` 或 `{ moments: [] }`；时间使用毫秒时间戳或日期字符串。媒体、标签、音乐字段也兼容 JSON 字符串。无效记录被过滤，网络失败或请求超时显示本地内容与重试入口。

## 交互与适配

桌面和移动端均使用右侧半透明灰色胶囊小点导航，鼠标移动后显示、静止 1.4 秒后隐藏；触屏点击或滑动时短暂显示，键盘聚焦时也可见，保留原有全屏页面切换和悬停显示的翻页箭头，不添加移动端底部导航。上下左右方向键切页；Now、Notes、Library 为单屏精选展示，无页面内部滚动；Moments 保留纵向阅读。操作输入控件和媒体时不触发全局切页。非当前页面不可聚焦，支持减少动态效果偏好。

主题首次跟随系统，此后保存手动选择。右下角播放器默认收缩为音乐圆钮，点击展开；通过减号或 Escape 收起，收起不打断播放。展开后展示封面、曲名、歌手、播放/暂停、可拖动进度、时间、前后跳转 10 秒、音量、静音与单曲循环，不提供 URL 输入界面。默认音乐在 `src/config/GlobalConfig.ts` 的 `wConf.MusicPlayer` 中配置 `url`、`title`、`artist` 和 `cover`。`url` 留空时没有默认曲目；填写 HTTP/HTTPS 音频直链后由用户点击播放，不自动播放。切换页面不打断播放，Moments 选曲仍然可用。音源需可直接访问且格式受浏览器支持，音乐平台分享页面不能直接作为音源。

下一版本的功能、交互、数据结构及验收条件见 [设计方案](docs/NEXT_UPDATE_DESIGN.md)。

## 展示页面

- **Now**：近况主文、当前关注摘要，以及实时日期和天气。
- **Notes**：一篇精选笔记与最多三条随记摘要。
- **Library**：最多三本精选书籍，配书封、作者、短评与影乐摘要。

三个页面均为展示页，内容集中在上述配置文件中，不包含新增、编辑、删除或待办管理入口，也不读写此前管理功能的本地数据。仓库提供的文案是初始展示内容，可按实际近况和收藏替换；只有日期与天气实时更新。

`src/components/ui/PageLayout.ts` 统一单屏容器、标题、细线和双栏摘要样式。三页采用 A 杂志式设计，占满当前可见屏幕高度（移动端使用动态视口），为顶栏和底部悬浮控件预留空间。手机减少至主内容与一条补充；屏高较小时使用配置中的短摘要并减少次要信息，保持字号可读。页面内容不滚动、不翻篇，也不打开详情。
