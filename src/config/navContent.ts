export interface NavLinkItem {
  name: string;
  url: string;
  description?: string;
  category?: string;
}

/** 导航页面配置及链接列表 */
export const navContent = {
  eyebrow: "Links / Curated bookmarks",
  title: "常去的地方，与路过的风景。",
  description: "常用站点与灵感收藏，点击卡片即可直接访问。",
  links: [
    {
      name: "Oblivion",
      url: "https://inpa.in",
      description: "Blog",
      category: "Blog",
    },
    {
      name: "GitHub",
      url: "https://github.com",
      description: "代码仓库与开源世界",
      category: "Develop",
    },
    {
      name: "Codex",
      url: "https://codex-resets.com/zh-CN",
      description: "Codex重置推送",
      category: "Codex",
    },
    {
      name: "Thoughts",
      url: "/thoughts",
      description: "偶发的灵感与碎片随想",
      category: "Note",
    },
    {
      name: "Media",
      url: "/media",
      description: "影音与视听收藏",
      category: "Media",
    },
    {
      name: "Links",
      url: "/links",
      description: "友链与灵感常逛",
      category: "Links",
    },
  ] as readonly NavLinkItem[],
} as const;
