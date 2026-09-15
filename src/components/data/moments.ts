export type MomentContent = string | { zh: string; en: string };
export interface Media {
  type: "img" | "vid";
  url: string;
}

export interface Music {
  title: string;
  artist: string;
  url: string;
}

export interface Moment {
  time: number;
  content?: MomentContent;
  media?: Media[];
  tags?: string[];
  location?: string;
  music?: Music;
}

export const moments: Moment[] = [
  {
    time: 1789122720000,
    content: "今天出去走了走。",
    media: [
      {
        type: "img",
        url: "https://raw.githubusercontent.com/AndyCort/PicGo/master/img/0497B09F-1CD0-40F7-82A1-9F719F5223A1_1_105_c.jpeg",
      },
      {
        type: "vid",
        url: "https://www.pexels.com/download/video/38417492/",
      },
    ],
    tags: ["日常", "随想"],
    location: "东京",
    music: {
      title: "Sorrow Love",
      artist: "Someone",
      url: "https://example.com/music",
    },
  },

  {
    time: 1789110240000,
    content:
      "如果本就走在与众不同的道路，那就不该期望自己会有什么传统意义上、或是流行文化中的那种功成名就。",
    media: [],
    tags: ["日常", "随想"],
    location: "Toyko",
    music: {
      title: "Sorrow Love",
      artist: "Someone",
      url: "https://example.com/music",
    },
  },

  {
    time: 1789445239000,
    content: "好的结果也可以是一种诅咒，而坏的结果也许是一种缓冲。",
    media: [],
    tags: ["日常", "随想"],
    location: "Estonia",
    music: {
      title: "Sorrow Love",
      artist: "Someone",
      url: "https://example.com/music",
    },
  },
];
