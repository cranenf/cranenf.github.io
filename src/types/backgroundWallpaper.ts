export type FullscreenWallpaperLayout = "classic" | "hero";

// 整页随机背景图：单张壁纸条目
export type PageBackgroundWallpaper = {
	file: string; // 桌面端文件名（含扩展名），位于 public/wallpaper/ 目录，默认 AVIF 格式
	webpFile?: string; // 同图的 WebP 兜底文件名；缺省时按 file 的主名自动推断为 .webp
	mobileFile?: string; // 移动端单独的文件名，缺省时与 file 相同
	srcWidth?: number; // 原图宽度（仅作记录）
	srcHeight?: number; // 原图高度（仅作记录）
};

// 整页随机背景图配置：在横幅模式（banner）下，为横幅以下的内容区提供随机背景图
export type PageBackgroundConfig = {
	enable: boolean; // 是否启用，关闭后恢复纯色背景
	fixed: boolean; // 桌面端背景是否固定（滚动时不移动）；移动端始终随内容滚动以保证滚动流畅
	wallpapers: PageBackgroundWallpaper[]; // 壁纸列表，每次整页加载随机选一张
};

// 界面不透明度：控制内容区卡片/面板的不透明度，数值越低壁纸越明显（不影响导航栏）
export type UiOpacityConfig = {
	enable?: boolean; // 是否在导航栏显示调节滑块，默认 false
	default?: number; // 默认值，0-100，默认 100（完全不透明）
};

export type BackgroundWallpaperConfig = {
	mode: "banner" | "fullscreen" | "overlay" | "none"; // 壁纸模式：banner横幅模式、fullscreen全屏壁纸、overlay全屏透明覆盖模式或none纯色背景
	src:
		| string
		| string[]
		| {
				desktop?: string | string[];
				mobile?: string | string[];
		  }; // 支持单个图片、图片数组或分别设置桌面端和移动端图片
	// 横幅壁纸和全屏壁纸共享配置
	common?: {
		dimOpacity?: number; // 横幅文字遮罩暗度，0-1之间，值越大越暗，默认0.15
		homeText?: {
			enable: boolean; // 是否在首页显示自定义文字（全局开关）
			title?: string; // 主标题
			subtitle?: string | string[]; // 副标题，支持单个字符串或字符串数组
			titleSize?: string; // 主标题字体大小，如 "3.5rem"
			subtitleSize?: string; // 副标题字体大小，如 "1.5rem"
			typewriter?: {
				enable: boolean; // 是否启用打字机效果
				speed: number; // 打字速度（毫秒）
				deleteSpeed: number; // 删除速度（毫秒）
				pauseTime: number; // 完整显示后的暂停时间（毫秒）
			};
			// 首页横幅标题下方的链接图标（可选）
			linksEnable?: boolean; // 是否显示标题下方的链接图标（默认 true）
			links?: {
				name: string; // 名称（用于 aria-label / title / 可选 showName 显示）
				url: string; // 链接地址
				icon: string; // Iconify 图标，如 "fa7-brands:github"
				showName?: boolean; // 是否显示文字（默认 false）
			}[];
		};
		// 壁纸轮播配置，横幅壁纸和全屏壁纸共享
		carousel?: {
			enable: boolean; // 是否启用壁纸轮播
			interval?: number; // 轮播间隔时间，单位毫秒
			transitionEffect?: "fade" | "zoom" | "slide" | "kenburns"; // 过渡效果: 'fade' 渐变 | 'zoom' 缩放 | 'slide' 滑动 | 'kenburns' 旋转木马
		};
		// 水波纹动画效果配置，横幅壁纸和全屏壁纸共享，开启会影响页面性能
		waves?: {
			enable:
				| boolean
				| {
						desktop: boolean; // 桌面端是否启用水波纹动画效果
						mobile: boolean; // 移动端是否启用水波纹动画效果
				  }; // 是否启用水波纹动画效果，支持布尔值或分别设置桌面端和移动端
		};
		// 渐变过渡效果配置，当水波纹关闭时自动启用，提供壁纸底部到背景色的平滑过渡
		gradient?: {
			enable:
				| boolean
				| {
						desktop: boolean; // 桌面端是否启用渐变过渡
						mobile: boolean; // 移动端是否启用渐变过渡
				  }; // 是否启用渐变过渡，支持布尔值或分别设置桌面端和移动端，默认true（水波纹关闭时自动生效）
			height?: string; // 渐变高度，默认 "30vh"
		};
	};

	// Banner模式特有配置
	banner?: {
		position?:
			| "top"
			| "center"
			| "bottom"
			| "top left"
			| "top center"
			| "top right"
			| "center left"
			| "center center"
			| "center right"
			| "bottom left"
			| "bottom center"
			| "bottom right"
			| "left top"
			| "left center"
			| "left bottom"
			| "right top"
			| "right center"
			| "right bottom"
			| string; // 壁纸位置，支持CSS object-position的所有值，包括百分比和像素值
		// 文章横幅信息："description" 显示描述，"meta" 显示日期、字数和阅读时长
		postInfo?: {
			mode: "description" | "meta";
		};
		// 图片填充方式："cover" 铺满整个横幅（会裁切上下），"contain" 完整显示原图不裁切
		fit?: "cover" | "contain";
		// fit 为 "contain" 时，两侧留白是否用同一张图的模糊放大版填充（默认 true）
		blurBackdrop?: boolean;
		navbar?: {
			transparentMode?: "semi" | "semifull" | "none"; // 导航栏透明模式："semi" 半透明，"semifull" 动态透明，"none" 纯色不透明
			blur?: number; // 毛玻璃模糊度，0 即关闭导航栏毛玻璃
		};
	};
	// 全屏透明覆盖模式特有配置
	overlay?: {
		zIndex?: number; // 层级，确保壁纸在合适的层级显示
		opacity?: number; // 壁纸透明度，0-1之间
		blur?: number; // 背景模糊程度，单位px
		cardOpacity?: number; // 卡片背景透明度，0-1之间
	};
	// 全屏壁纸模式特有配置
	fullscreen?: {
		layout?: FullscreenWallpaperLayout; // 全屏布局：classic 文档流模式，hero 固定全屏首屏模式
		position?: string; // 壁纸位置，支持CSS object-position的所有值
		// 全屏壁纸模式的导航栏配置（仅有半透明/动态透明两种）
		navbar?: {
			transparentMode?: "semi" | "semifull"; // 导航栏透明模式："semi" 半透明，"semifull" 动态透明（仅首页顶部透明）
			blur?: number; // 导航栏毛玻璃模糊度，0 即关闭（玻璃态生效）
		};
		// 首页下滑时壁纸模糊渐变开关（从 0 渐变为 overlay.blur 的最大模糊）
		blurRamp?: {
			enable:
				| boolean
				| {
						desktop: boolean; // 桌面端是否启用模糊渐变
						mobile: boolean; // 移动端是否启用模糊渐变
				  }; // 是否启用模糊渐变，支持布尔值或分别设置桌面端和移动端，默认 true
		};
	};
	pageBackground?: PageBackgroundConfig; // 横幅模式下的整页随机背景图（横幅以下区域）
	uiOpacity?: UiOpacityConfig; // 界面不透明度滑块（导航栏除外）
};
