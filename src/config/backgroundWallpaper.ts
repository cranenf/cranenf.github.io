import type { BackgroundWallpaperConfig } from "@/types/backgroundWallpaper";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// 壁纸模式："banner" 横幅壁纸，"fullscreen" 全屏壁纸，"overlay" 覆盖透明，"none" 纯色背景无壁纸
	mode: "banner",
	/**
	 * 背景图片配置
	 * 图片路径支持三种格式：
	 * 1. public 目录（以 "/" 开头，不优化）："/assets/images/banner.avif"
	 * 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/banner.avif"
	 * 3. 远程 URL："https://example.com/banner.jpg"
	 * 注意：远程URL和public目录的图片不会被优化，请确保图片体积足够小以免影响加载速度
	 *
	 * 建议不要替换d1-d6，m1-m6这些默认示例图片，但你可以删除掉节省空间
	 * 因为以后可能会更换示例图片，导致你自定义的图片被覆盖
	 * 所以建议使用自己的图片的时候命名为其他名称，不要使用d1-d6，m1-m6这些名称
	 *
	 * 如果只使用一张图片或者使用随机图API，推荐直接使用字符串格式：
	 * desktop: "https://t.alcy.cc/pc",   // 随机图API
	 * desktop: "assets/images/DesktopWallpaper/d1.avif", // 单张图片
	 *
	 * mobile: "https://t.alcy.cc/mp", // 随机图API
	 * mobile: "assets/images/MobileWallpaper/m1.avif", // 单张图片
	 *
	 * 支持配置多张图片（数组），每次刷新页面随机显示一张：
	 * desktop: [
	 * "assets/images/DesktopWallpaper/d1.avif",
	 * "assets/images/DesktopWallpaper/d2.avif",
	 * ],
	 *
	 * mobile:[
	 *   "assets/images/MobileWallpaper/m1.avif",
	 *   "assets/images/MobileWallpaper/m2.avif",
	 * ],
	 */
	src: {
		// 桌面背景图片
		desktop: "assets/images/background.jpg",
		// 移动背景图片
		mobile: "assets/images/background.jpg",
	},
	// 横幅壁纸和全屏壁纸共享配置
	common: {
		// 壁纸遮罩暗度，让横幅文字显示更清晰，0-1之间，值越大越暗
		dimOpacity: 0.2,
		// 主页横幅文字
		homeText: {
			// 是否启用主页横幅文字
			enable: true,
			// 主页横幅主标题
			title: "Crane nf",
			// 主页横幅主标题字体大小
			titleSize: "4.5rem",
			// 主页横幅副标题
			subtitle: ["In the solitude, where we are least alone."],
			// 主页横幅副标题字体大小
			subtitleSize: "1.5rem",
			typewriter: {
				// 是否启用打字机效果
				// 打字机开启 → 循环显示所有副标题
				// 打字机关闭 → 每次刷新随机显示一条副标题
				enable: true,
				// 打字速度（毫秒）
				speed: 100,
				// 删除速度（毫秒）
				deleteSpeed: 50,
				// 完全显示后的暂停时间（毫秒）
				pauseTime: 2000,
			},
			// 是否显示标题下方的链接图标
			linksEnable: true,
			// 首页横幅标题下方的链接图标（可选，支持 showName 显示文字）
			// 图标支持 Iconify 格式：fa7-brands:github、fa7-solid:envelope、mdi:rss 等
			links: [
				{
					name: "GitHub",
					icon: "fa7-brands:github",
					url: "https://github.com/cranenf",
					showName: true,
				},
				{
					name: "Email",
					icon: "fa7-solid:envelope",
					url: "mailto:cranenf@gmail.com",
				},
				{
					name: "RSS",
					icon: "fa7-solid:rss",
					url: "/rss/",
				},
			],
		},
		// 壁纸轮播配置，横幅壁纸和全屏壁纸共享，仅在配置多张图片时生效
		carousel: {
			// 是否启用壁纸轮播；关闭时保持每次刷新随机显示一张
			enable: false,
			// 轮播切换间隔（毫秒）
			interval: 5000,
			// 过渡效果: 'fade' 渐变 | 'zoom' 缩放 | 'slide' 滑动 | 'kenburns' 旋转木马
			transitionEffect: "zoom",
		},
		// 水波纹动画效果配置，开启会影响页面性能，增加内存占用，请根据自己的喜好开启
		waves: {
			enable: {
				// 桌面端是否启用水波纹动画效果
				desktop: true,
				// 移动端是否启用水波纹动画效果
				mobile: true,
			},
		},
		// 渐变过渡效果配置，当水波纹关闭时自动启用，提供壁纸底部到背景色的平滑过渡
		gradient: {
			enable: {
				// 桌面端是否启用渐变过渡
				desktop: true,
				// 移动端是否启用渐变过渡
				mobile: true,
			},
			// 渐变高度
			height: "10%",
		},
	},
	// Banner模式特有配置
	banner: {
		// 图片位置
		// 支持所有CSS object-position值，如: 'top', 'center', 'bottom', 'left top', 'right bottom', '25% 75%', '10px 20px'..
		// 如果不知道怎么配置百分百之类的配置，推荐直接使用：'center'居中，'top'顶部居中，'bottom' 底部居中，'left'左侧居中，'right'右侧居中
		position: "0% 20%",
		// 图片填充方式："cover" 铺满整个横幅（按比例裁切上下），"contain" 完整显示原图、不裁切
		// 注意：原图比例与横幅差别较大时建议用 "contain"，否则只会看到中间一条
		fit: "contain",
		// fit 为 "contain" 时，两侧留白用同一张图的模糊放大版填充（不会额外下载图片）
		blurBackdrop: true,
		// 文章横幅信息："description" 显示描述，"meta" 显示日期、字数和阅读时长
		postInfo: {
			mode: "description",
		},
		// 导航栏配置
		navbar: {
			// 导航栏透明模式："semi" 半透明，"semifull" 动态透明，"none" 纯色不透明
			transparentMode: "semi",
			// 毛玻璃模糊度，0 即关闭导航栏的毛玻璃
			// 注意：导航栏子菜单与浮动面板始终保留毛玻璃，模糊度跟随此项但有最小值
			blur: 12,
		},
	},
	// 覆盖透明覆盖模式特有配置
	overlay: {
		// 层级，确保壁纸在背景层
		zIndex: -1,
		// 壁纸透明度
		opacity: 0.8,
		// 背景模糊度
		blur: 10,
		// 卡片透明度，0-1之间，值越小越透明
		cardOpacity: 0.6,
	},
	// 全屏壁纸模式特有配置
	// 壁纸模糊度(blur)、卡片透明度(cardOpacity)、层级(zIndex) 复用上方 overlay 模式的配置；
	// 背景透明度(opacity)不适用（全屏壁纸不透明）；导航栏透明模式由 fullscreen.navbar.transparentMode 控制，脱离 banner 的 navbar 配置
	fullscreen: {
		// 布局模式："classic" 经典文档流全屏壁纸，"hero" 固定全屏首屏壁纸
		layout: "classic",
		// 图片位置
		position: "center",
		// 全屏壁纸模式的导航栏配置
		navbar: {
			// 导航栏透明模式："semi" 半透明，"semifull" 动态透明（仅首页顶部透明、下滑玻璃化；非首页均跟卡片半透明）
			transparentMode: "semifull",
			// 导航栏毛玻璃模糊度，0 即关闭（玻璃态生效）
			blur: 12,
		},
		// 首页下滑时壁纸模糊渐变开关（从 0 渐变为 overlay.blur 的最大模糊）
		// 关闭后该设备上全屏壁纸保持清晰（首页与非首页都不模糊），设置面板的模糊度滑块也会隐藏
		blurRamp: {
			enable: {
				// 桌面端是否启用模糊渐变
				desktop: true,
				// 移动端是否启用模糊渐变
				mobile: true,
			},
		},
	},
	/**
	 * 整页随机背景图（横幅模式专用）
	 *
	 * 作用：在保持 mode: "banner"（顶部横幅壁纸）不变的前提下，
	 * 为横幅下方原本是纯色（--page-bg）的区域铺一张随机背景图。
	 * 向下滚动时顶部横幅照常移出视口，而背景图始终留在那里。
	 *
	 * 文件放在 public/wallpaper/ 目录下，由 _sources.json 记录来源（Steam 创意工坊 ID）。
	 * 每张都提供 AVIF + WebP 两种格式，浏览器自动择优选一个下载（可用 Chrome 的
	 * 网络面板确认只请求了一个文件）。每次整页加载/刷新随机选一张，
	 * 站内跳转（Swup）不会更换，避免翻页时背景跳变。
	 *
	 * 关闭方法：把 enable 改成 false 即可恢复纯色背景，无需删除图片。
	 */
	pageBackground: {
		enable: true,
		// 桌面端背景是否固定（滚动时背景不动）；移动端始终改为随内容滚动，
		// 因为 background-attachment: fixed 在手机上会造成滚动掉帧
		fixed: true,
		wallpapers: [
			{ file: "w01.avif", srcWidth: 7684, srcHeight: 4320 }, // 落日群山 · 原神 荧 世界の镇魂歌
			{ file: "w02.avif", srcWidth: 7680, srcHeight: 4320 }, // 欧式小巷 · 伊蕾娜
			{ file: "w03.avif", srcWidth: 5241, srcHeight: 2937 }, // prism magic
			{ file: "w04.avif", srcWidth: 4096, srcHeight: 2451 }, // Arknights Ch'en Office
			{ file: "w05.avif", srcWidth: 4096, srcHeight: 2180 }, // anime rain · 雨夜车窗
			{ file: "w06.avif", srcWidth: 3840, srcHeight: 2160 }, // Golden flowers
			{ file: "w07.avif", srcWidth: 3840, srcHeight: 2160 }, // 昼間
			{ file: "w08.avif", srcWidth: 3840, srcHeight: 2160 }, // 桜吹雪
			{ file: "w09.avif", srcWidth: 3840, srcHeight: 2160 }, // Girl and Fluorescent Beach
			{ file: "w10.avif", srcWidth: 3840, srcHeight: 2160 }, // Subway Station
			{ file: "w11.avif", srcWidth: 6144, srcHeight: 3072 }, // 莉可丽丝 · 欧风街道
			{ file: "w12.avif", srcWidth: 5248, srcHeight: 2944 }, // 赛博色彩 · 夏橙水韵
			{ file: "w13.avif", srcWidth: 4415, srcHeight: 2484 }, // 崩坏星穹铁道 · 布洛妮娅
			{ file: "w14.avif", srcWidth: 2560, srcHeight: 1440 }, // 最初的约会 · 咖啡店
			{ file: "w15.avif", srcWidth: 4096, srcHeight: 2304 }, // 原神 · 芙宁娜
			{ file: "w16.avif", srcWidth: 3840, srcHeight: 2160 }, // 雷电影 · 电竞桌面
			{ file: "w17.avif", srcWidth: 2560, srcHeight: 1440 }, // 放課後の女生徒
			{ file: "w18.avif", srcWidth: 3840, srcHeight: 2160 }, // 那日与你一同的见证
			{ file: "w19.avif", srcWidth: 3840, srcHeight: 2160 }, // 原神 · 神里绫华 水花
			{ file: "w20.avif", srcWidth: 2560, srcHeight: 1440 }, // 来水美树 · ランス10
			{ file: "w21.avif", srcWidth: 2560, srcHeight: 1440 }, // 雨天 · 商店旁的少女
			{ file: "w22.avif", srcWidth: 2560, srcHeight: 1440 }, // Solemn Downpour · 雨与猫
			{ file: "w23.avif", srcWidth: 3840, srcHeight: 2160 }, // 来自法兰西的少女
			{ file: "w24.avif", srcWidth: 2560, srcHeight: 1440 }, // 心海的房间
			{ file: "w25.avif", srcWidth: 3840, srcHeight: 2160 }, // 暗夜 · 花街
			{ file: "w26.avif", srcWidth: 3840, srcHeight: 2160 }, // 微笑 p2
			{ file: "w27.avif", srcWidth: 2560, srcHeight: 1440 }, // 蓝瞳的猫娘
			{ file: "w28.avif", srcWidth: 2271, srcHeight: 1277 }, // 阳光少女
			{ file: "w29.avif", srcWidth: 3840, srcHeight: 2160 }, // 孤独摇滚 · 便利店
			{ file: "w30.avif", srcWidth: 3840, srcHeight: 2160 }, // 明日方舟 · 星极
			{ file: "w31.avif", srcWidth: 3840, srcHeight: 2160 }, // 浮光
			{ file: "w32.avif", srcWidth: 3840, srcHeight: 2160 }, // 原神 · 芙宁娜 3D
			{ file: "w33.avif", srcWidth: 3840, srcHeight: 2160 }, // 绝望的落日
			{ file: "w34.avif", srcWidth: 3840, srcHeight: 2160 }, // 黑桃 · 纸牌之夜
			{ file: "w35.avif", srcWidth: 3840, srcHeight: 2160 }, // 初音未来 4K
			{ file: "w36.avif", srcWidth: 3840, srcHeight: 2160 }, // 绝区零 · 青衣国风
			{ file: "w37.avif", srcWidth: 3840, srcHeight: 2160 }, // 打游戏的少女
			{ file: "w38.avif", srcWidth: 3840, srcHeight: 2160 }, // 看落日的少女
			{ file: "w39.avif", srcWidth: 3296, srcHeight: 1920 }, // 爱莉 · 花丛
			{ file: "w40.avif", srcWidth: 2560, srcHeight: 1440 }, // 墨心
			{ file: "w41.avif", srcWidth: 2560, srcHeight: 1440 }, // 夏日的森林
			{ file: "w42.avif", srcWidth: 2560, srcHeight: 1440 }, // 花之少女 · 秋
			{ file: "w43.avif", srcWidth: 2560, srcHeight: 1440 }, // Skuld
			{ file: "w44.avif", srcWidth: 2560, srcHeight: 1440 }, // 雨天 · 商店街
			{ file: "w45.avif", srcWidth: 2560, srcHeight: 1440 }, // 莉可丽丝 · 车站人群
			{ file: "w46.avif", srcWidth: 2560, srcHeight: 1440 }, // 星空 · 粉色少女
			{ file: "w47.avif", srcWidth: 2560, srcHeight: 1440 }, // Pastel Mix
			{ file: "w48.avif", srcWidth: 2560, srcHeight: 1440 }, // 星穹 · 初音未来
			{ file: "w49.avif", srcWidth: 2560, srcHeight: 1440 }, // Lo-fi 落日
			{ file: "w50.avif", srcWidth: 2560, srcHeight: 1440 }, // 白夜 · 明亮的房间
		],
	},
	/**
	 * 界面不透明度（导航栏除外）
	 *
	 * 在导航栏搜索框左侧显示一个 0-100 的滑块，用来调整内容区卡片/面板的不透明度，
	 * 数值越低卡片越透明、背后的壁纸越明显。取值会写进 localStorage，
	 * 刷新后仍然生效；导航栏自身保持不透明。
	 *
	 * 关闭方法：把 enable 改成 false，滑块不再渲染，界面恢复原有外观。
	 */
	uiOpacity: {
		enable: true,
		// 默认值，0-100，100 表示完全不透明（与原主题外观完全一致）
		default: 100,
	},
};
