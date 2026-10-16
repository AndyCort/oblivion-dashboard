export interface ShelfBook {
  id: string;
  title: string;
  originalTitle: string;
  author: string;
  category: string;
  note: string;
  summary: string;
  tags: readonly string[];
  color: string;
  ink: string;
  motif: "circle" | "arch" | "lines";
}

/** 展示页文案与选辑。可按实际收藏替换；介绍均为原创概述，并非书中引文。 */
export const libraryContent = {
  title: "书页、银幕与声音。",
  description: "书页、银幕与声音。留下一些值得停留的片刻，也给新的灵感留一点空位。",
  introduction: "一份关于设计、自然与想象的书影音选辑。",
  books: [
    {
      id: "everyday-things",
      title: "设计心理学",
      summary: "从日常物件开始，重新观察设计与生活。",
      originalTitle: "The Design of\nEveryday Things",
      author: "Don Norman / 唐纳德·诺曼",
      category: "Design & everyday life",
      note: "从一扇门、一个开关开始，重新观察日常物件。好的设计，让人不用猜测下一步该怎么做。",
      tags: ["设计", "日常观察"],
      color: "#d7c6b5",
      ink: "#4e3b2e",
      motif: "circle",
    },
    {
      id: "invisible-cities",
      title: "看不见的城市",
      summary: "在城市里，寻找记忆、愿望和想象。",
      originalTitle: "Invisible\nCities",
      author: "Italo Calvino / 伊塔洛·卡尔维诺",
      category: "Fiction & imagination",
      note: "城市不只是街道与建筑，也藏着记忆、愿望和想象。短小的篇章，为熟悉的世界打开另一种视角。",
      tags: ["文学", "想象力"],
      color: "#c6c8d8",
      ink: "#40405b",
      motif: "arch",
    },
    {
      id: "walden",
      title: "瓦尔登湖",
      summary: "从湖水与四季中，辨认生活真正需要的。",
      originalTitle: "Walden",
      author: "Henry David Thoreau / 亨利·戴维·梭罗",
      category: "Nature & contemplation",
      note: "湖水、四季与简单的生活，成为思考的入口。把目光从繁忙中移开，重新辨认什么是生活真正需要的。",
      tags: ["自然", "生活随笔"],
      color: "#bbcbbf",
      ink: "#354f42",
      motif: "lines",
    },
  ] satisfies readonly ShelfBook[],
  media: [
    {
      id: "perfect-days",
      kind: "film" as const,
      category: "On screen / 电影",
      title: "Perfect Days",
      subtitle: "完美的日子 · Wim Wenders",
      note: "树影、磁带与重复的日常。平凡生活里的细节，也可以构成一部温柔的电影。",
      tags: ["日常", "光影"],
    },
    {
      id: "ambient-1",
      kind: "music" as const,
      category: "In the air / 音乐",
      title: "Music for Airports",
      subtitle: "Ambient 1 · Brian Eno",
      note: "舒缓的音色在空间里慢慢展开。不必占据全部注意力，也能让留白拥有自己的声音。",
      tags: ["Ambient", "慢节奏"],
    },
  ],
  reflection: {
    eyebrow: "Between the pages / 阅读随记",
    title: "有些收获，发生在合上书之后。",
    text: "不急着把每一页都变成结论。让一个细节、一种声音或一个问题留下来，在下一次散步、交谈和发呆时，慢慢长出新的意思。",
  },
} as const;
