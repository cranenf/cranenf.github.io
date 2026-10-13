/**
 * 右侧边栏「收起 / 展开」按钮的交互接线。
 *
 * 按钮在右栏的静态容器内（position 为 both/right 时不被 Swup 替换），
 * 但用 document 事件委托绑定：position 为 left 时右栏走动态容器会被换掉，
 * 委托可以免去「切页后重新找元素绑监听」的麻烦。
 */

import {
	isRightSidebarCollapsed,
	setRightSidebarCollapsed,
	syncRightSidebarCollapsedClass,
} from "@/utils/grid-layout-utils";

/** 按钮 id：组件、样式与脚本共用这一个字面值 */
export const RIGHT_SIDEBAR_COLLAPSE_BTN_ID = "right-sidebar-collapse-btn";

/** 同步按钮的无障碍状态与提示文案（收起后按钮的语义变成「展开侧边栏」） */
export function syncRightSidebarCollapseButton(): void {
	const btn = document.getElementById(RIGHT_SIDEBAR_COLLAPSE_BTN_ID);
	if (!btn) return;

	const collapsed = isRightSidebarCollapsed();
	const label = collapsed ? "展开侧边栏" : "收起侧边栏";
	btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
	btn.setAttribute("aria-label", label);
	btn.setAttribute("title", label);
}

/** 注册收起按钮的点击委托（全局只需一次） */
export function initRightSidebarCollapse(): void {
	if (window.__rightSidebarCollapseInit) return;
	window.__rightSidebarCollapseInit = true;

	// 初始化时把 html 类名与按钮语义对齐当前状态
	syncRightSidebarCollapsedClass();
	syncRightSidebarCollapseButton();

	document.addEventListener("click", (event) => {
		const target = event.target as Element | null;
		if (!target?.closest(`#${RIGHT_SIDEBAR_COLLAPSE_BTN_ID}`)) return;
		event.preventDefault();
		setRightSidebarCollapsed(!isRightSidebarCollapsed());
		syncRightSidebarCollapseButton();
	});

	// 软导航后按钮可能被重新渲染（动态容器），语义要重新对齐；
	// html 上的状态类不会被 Swup 动到，状态本身保持
	document.addEventListener("astro:page-load", syncRightSidebarCollapseButton);
	document.addEventListener(
		"swup:contentReplaced",
		syncRightSidebarCollapseButton,
	);
}
