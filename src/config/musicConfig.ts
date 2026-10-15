import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: false,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "10046455237",
		// 认证 token（可选）
		auth: "",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		playlist: [
			{
				name: "ヨスガノソラ メインテーマ -遠い空へ- (飞向遥远的天空)",
				artist: "市川淳",
				url: "/assets/music/市川淳 - ヨスガノソラ メインテーマ -遠い空へ-.mp3",
				cover:
					"/assets/music/cover/市川淳 - ヨスガノソラ メインテーマ -遠い空へ-.webp",
				lrc: "",
			},
			{
				name: "ヨスガノソラ メインテーマ -記憶-",
				artist: "市川淳",
				url: "/assets/music/市川淳 - ヨスガノソラ メインテーマ -記憶-.mp3",
				cover:
					"/assets/music/cover/市川淳 - ヨスガノソラ メインテーマ -記憶-.webp",
				lrc: "",
			},
			{
				name: "Old Memory",
				artist: "市川淳",
				url: "/assets/music/市川淳 - Old Memory.mp3",
				cover: "/assets/music/cover/市川淳 - Old Memory.webp",
				lrc: "",
			},
			{
				name: "その日の事",
				artist: "市川淳",
				url: "/assets/music/市川淳 - その日の事.mp3",
				cover: "/assets/music/cover/市川淳 - その日の事.webp",
				lrc: "",
			},
			{
				name: "笑顔の行方",
				artist: "市川淳",
				url: "/assets/music/市川淳 - 笑顔の行方.mp3",
				cover: "/assets/music/cover/市川淳 - 笑顔の行方.webp",
				lrc: "",
			},
			{
				name: "追憶ハート",
				artist: "市川淳",
				url: "/assets/music/市川淳 - 追憶ハート.mp3",
				cover: "/assets/music/cover/市川淳 - 追憶ハート.webp",
				lrc: "",
			},
			{
				name: "So Sweet Sorrow",
				artist: "市川淳",
				url: "/assets/music/市川淳 - So Sweet Sorrow.mp3",
				cover: "/assets/music/cover/市川淳 - So Sweet Sorrow.webp",
				lrc: "",
			},
			{
				name: "Deep Inside Region",
				artist: "市川淳",
				url: "/assets/music/市川淳 - Deep Inside Region.mp3",
				cover: "/assets/music/cover/市川淳 - Deep Inside Region.webp",
				lrc: "",
			},
			{
				name: "Suspended",
				artist: "市川淳",
				url: "/assets/music/市川淳 - Suspended.mp3",
				cover: "/assets/music/cover/市川淳 - Suspended.webp",
				lrc: "",
			},
			{
				name: "Rain like tears",
				artist: "市川淳",
				url: "/assets/music/市川淳 - Rain like tears.mp3",
				cover: "/assets/music/cover/市川淳 - Rain like tears.webp",
				lrc: "",
			},
			{
				name: "Before it's too late",
				artist: "市川淳",
				url: "/assets/music/市川淳 - Before it's too late.mp3",
				cover: "/assets/music/cover/市川淳 - Before it's too late.webp",
				lrc: "",
			},
			{
				name: "ハルカノココロ",
				artist: "市川淳",
				url: "/assets/music/市川淳 - ハルカノココロ.mp3",
				cover: "/assets/music/cover/市川淳 - ハルカノココロ.webp",
				lrc: "",
			},
			{
				name: "June Song",
				artist: "市川淳",
				url: "/assets/music/市川淳 - June Song.mp3",
				cover: "/assets/music/cover/市川淳 - June Song.webp",
				lrc: "",
			},
			{
				name: "素直と不器用と意地っ張り (坦率、笨拙与固执)",
				artist: "三輪学",
				url: "/assets/music/三輪学 - 素直と不器用と意地っ張り.mp3",
				cover: "/assets/music/cover/三輪学 - 素直と不器用と意地っ張り.webp",
				lrc: "",
			},
			{
				name: "膝枕で過ごす放課後 (在膝枕上度过放学后)",
				artist: "三輪学",
				url: "/assets/music/三輪学 - 膝枕で過ごす放課後.mp3",
				cover: "/assets/music/cover/三輪学 - 膝枕で過ごす放課後.webp",
				lrc: "",
			},
			{
				name: "優しい風が吹くあの場所で",
				artist: "三輪学",
				url: "/assets/music/三輪学 - 優しい風が吹くあの場所で.mp3",
				cover: "/assets/music/cover/三輪学 - 優しい風が吹くあの場所で.webp",
				lrc: "",
			},
			{
				name: "寂しい夜",
				artist: "三輪学",
				url: "/assets/music/三輪学 - 寂しい夜.mp3",
				cover: "/assets/music/cover/三輪学 - 寂しい夜.webp",
				lrc: "",
			},
			{
				name: "追い求めてきたもの",
				artist: "三輪学",
				url: "/assets/music/三輪学 - 追い求めてきたもの.mp3",
				cover: "/assets/music/cover/三輪学 - 追い求めてきたもの.webp",
				lrc: "",
			},
			{
				name: "華色の青春",
				artist: "うたたね歌菜",
				url: "/assets/music/うたたね歌菜 - 華色の青春.mp3",
				cover: "/assets/music/cover/うたたね歌菜 - 華色の青春.webp",
				lrc: "",
			},
			{
				name: "使一颗心免于哀伤",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/使一颗心免于哀伤-哼唱.mp3",
				cover: "/assets/music/cover/109951169585655912.webp",
				lrc: "",
			},
			{
				name: "Box of the memory",
				artist: "BURTON",
				url: "/assets/music/BURTON - Box of the memory_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Cold rain",
				artist: "BURTON",
				url: "/assets/music/BURTON - Cold rain_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Dream within a dream",
				artist: "BURTON",
				url: "/assets/music/BURTON - Dream within a dream_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Gentle heart",
				artist: "BURTON",
				url: "/assets/music/BURTON - Gentle heart_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Graceful lady",
				artist: "BURTON",
				url: "/assets/music/BURTON - Graceful lady_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Happy story",
				artist: "BURTON",
				url: "/assets/music/BURTON - Happy story_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Lovers' talk",
				artist: "BURTON",
				url: "/assets/music/BURTON - Lovers' talk_H (V0).mp3",
				lrc: "",
			},
			{
				name: "LOVING TRIP (Piano Ver.)",
				artist: "BURTON",
				url: "/assets/music/BURTON - LOVING TRIP (Piano Ver_)_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Rain stops and",
				artist: "BURTON",
				url: "/assets/music/BURTON - Rain stops and____H (V0).mp3",
				lrc: "",
			},
			{
				name: "Secret time",
				artist: "BURTON",
				url: "/assets/music/BURTON - Secret time_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Sunny spot",
				artist: "BURTON",
				url: "/assets/music/BURTON - Sunny spot_H (V0).mp3",
				lrc: "",
			},
			{
				name: "The depths of eyes",
				artist: "BURTON",
				url: "/assets/music/BURTON - The depths of eyes_H (V0).mp3",
				lrc: "",
			},
			{
				name: "Godzilla (Explicit)",
				artist: "Eminem & Juice WRLD",
				url: "/assets/music/Eminem _ Juice WRLD - Godzilla (Explicit) (V0).mp3",
				lrc: "",
			},
			{
				name: "BULLET",
				artist: "NF",
				url: "/assets/music/NF - BULLET.mp3",
				cover: "/assets/music/cover/NF - BULLET.webp",
				lrc: "",
			},
			{
				name: "Change",
				artist: "NF",
				url: "/assets/music/NF - Change.mp3",
				cover: "/assets/music/cover/NF - Change.webp",
				lrc: "",
			},
			{
				name: "HAPPY",
				artist: "NF",
				url: "/assets/music/NF - HAPPY.mp3",
				cover: "/assets/music/cover/NF - HAPPY.webp",
				lrc: "",
			},
			{
				name: "Hate Myself",
				artist: "NF",
				url: "/assets/music/NF - Hate Myself.mp3",
				cover: "/assets/music/cover/NF - Hate Myself.webp",
				lrc: "",
			},
			{
				name: "HOPE",
				artist: "NF",
				url: "/assets/music/NF - HOPE.mp3",
				cover: "/assets/music/cover/NF - HOPE.webp",
				lrc: "",
			},
			{
				name: "I Miss The Days",
				artist: "NF",
				url: "/assets/music/NF - I Miss The Days.mp3",
				cover: "/assets/music/cover/NF - I Miss The Days.webp",
				lrc: "",
			},
			{
				name: "-Interlude-",
				artist: "NF",
				url: "/assets/music/NF - -Interlude-.mp3",
				cover: "/assets/music/cover/NF - -Interlude-.webp",
				lrc: "",
			},
			{
				name: "Leave Me Alone",
				artist: "NF",
				url: "/assets/music/NF - Leave Me Alone.mp3",
				cover: "/assets/music/cover/NF - Leave Me Alone.webp",
				lrc: "",
			},
			{
				name: "LET EM PRAY",
				artist: "NF",
				url: "/assets/music/NF - LET EM PRAY.mp3",
				cover: "/assets/music/cover/NF - LET EM PRAY.webp",
				lrc: "",
			},
			{
				name: "Let Me Go",
				artist: "NF",
				url: "/assets/music/NF - Let Me Go.mp3",
				cover: "/assets/music/cover/NF - Let Me Go.webp",
				lrc: "",
			},
			{
				name: "Like This",
				artist: "NF",
				url: "/assets/music/NF - Like This.mp3",
				cover: "/assets/music/cover/NF - Like This.webp",
				lrc: "",
			},
			{
				name: "MAMA",
				artist: "NF",
				url: "/assets/music/NF - MAMA.mp3",
				cover: "/assets/music/cover/NF - MAMA.webp",
				lrc: "",
			},
			{
				name: "MISTAKE",
				artist: "NF",
				url: "/assets/music/NF - MISTAKE.mp3",
				cover: "/assets/music/cover/NF - MISTAKE.webp",
				lrc: "",
			},
			{
				name: "MOTTO",
				artist: "NF",
				url: "/assets/music/NF - MOTTO.mp3",
				cover: "/assets/music/cover/NF - MOTTO.webp",
				lrc: "",
			},
			{
				name: "My Stress",
				artist: "NF",
				url: "/assets/music/NF - My Stress.mp3",
				cover: "/assets/music/cover/NF - My Stress.webp",
				lrc: "",
			},
			{
				name: "Nate",
				artist: "NF",
				url: "/assets/music/NF - Nate.mp3",
				cover: "/assets/music/cover/NF - Nate.webp",
				lrc: "",
			},
			{
				name: "No Excuses",
				artist: "NF",
				url: "/assets/music/NF - No Excuses.mp3",
				cover: "/assets/music/cover/NF - No Excuses.webp",
				lrc: "",
			},
			{
				name: "Options",
				artist: "NF",
				url: "/assets/music/NF - Options.mp3",
				cover: "/assets/music/cover/NF - Options.webp",
				lrc: "",
			},
			{
				name: "PANDEMONIUM",
				artist: "NF",
				url: "/assets/music/NF - PANDEMONIUM.mp3",
				cover: "/assets/music/cover/NF - PANDEMONIUM.webp",
				lrc: "",
			},
			{
				name: "Returns",
				artist: "NF",
				url: "/assets/music/NF - Returns.mp3",
				cover: "/assets/music/cover/NF - Returns.webp",
				lrc: "",
			},
			{
				name: "RUNNING",
				artist: "NF",
				url: "/assets/music/NF - RUNNING.mp3",
				cover: "/assets/music/cover/NF - RUNNING.webp",
				lrc: "",
			},
			{
				name: "SUFFICE",
				artist: "NF",
				url: "/assets/music/NF - SUFFICE.mp3",
				cover: "/assets/music/cover/NF - SUFFICE.webp",
				lrc: "",
			},
			{
				name: "The Search",
				artist: "NF",
				url: "/assets/music/NF - The Search.mp3",
				cover: "/assets/music/cover/NF - The Search.webp",
				lrc: "",
			},
			{
				name: "Thinking",
				artist: "NF",
				url: "/assets/music/NF - Thinking.mp3",
				cover: "/assets/music/cover/NF - Thinking.webp",
				lrc: "",
			},
			{
				name: "Time (Extended)",
				artist: "NF",
				url: "/assets/music/NF - Time (Extended).mp3",
				cover: "/assets/music/cover/NF - Time (Extended).webp",
				lrc: "",
			},
			{
				name: "Time",
				artist: "NF",
				url: "/assets/music/NF - Time.mp3",
				cover: "/assets/music/cover/NF - Time.webp",
				lrc: "",
			},
			{
				name: "Trauma",
				artist: "NF",
				url: "/assets/music/NF - Trauma.mp3",
				cover: "/assets/music/cover/NF - Trauma.webp",
				lrc: "",
			},
			{
				name: "TURN MY BACK",
				artist: "NF",
				url: "/assets/music/NF - TURN MY BACK.mp3",
				cover: "/assets/music/cover/NF - TURN MY BACK.webp",
				lrc: "",
			},
			{
				name: "When I Grow Up",
				artist: "NF",
				url: "/assets/music/NF - When I Grow Up.mp3",
				cover: "/assets/music/cover/NF - When I Grow Up.webp",
				lrc: "",
			},
			{
				name: "WHY",
				artist: "NF",
				url: "/assets/music/NF - WHY.mp3",
				cover: "/assets/music/cover/NF - WHY.webp",
				lrc: "",
			},
			{
				name: "CAREFUL",
				artist: "NF, Cordae",
				url: "/assets/music/NF, Cordae - CAREFUL.mp3",
				cover: "/assets/music/cover/NF, Cordae - CAREFUL.webp",
				lrc: "",
			},
			{
				name: "GONE",
				artist: "NF, Julia Michaels",
				url: "/assets/music/NF, Julia Michaels - GONE.mp3",
				cover: "/assets/music/cover/NF, Julia Michaels - GONE.webp",
				lrc: "",
			},
			{
				name: "Only",
				artist: "NF, Sasha Alex Sloan",
				url: "/assets/music/NF, Sasha Alex Sloan - Only.mp3",
				cover: "/assets/music/cover/NF, Sasha Alex Sloan - Only.webp",
				lrc: "",
			},
		],
	},
};
