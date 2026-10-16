/** Now 展示页文案。修改这里即可更新近况，无需修改页面组件。 */
export const nowContent = {
  eyebrow: "LIFE, IN PROGRESS",
  title: "最近，在慢慢做的事。",
  description: "一些正在关注的主题，一点日常的节奏。把生活的切片留在这里。",
  introduction: {
    label: "这一阵子",
    summary: "在界面、文字与旋律之间，留意日常的小细节，也给进行中的想法一点空间。",
    title: "让生活具体一点，\n也让思绪自由一点。",
    paragraphs: [
      "关注那些让日常变得舒服的小细节：顺手的界面、读到一半的文字，还有恰好响起的一段旋律。很多变化，都是从这些不起眼的地方开始的。",
      "这里留给进行中的想法。它们不必立刻有答案，也不必马上成为作品；能被看见、被记下来，就已经很好。",
    ],
    tags: ["界面与体验", "阅读与记录", "音乐与日常"],
    footnote: "保持好奇，允许事情慢慢发生。",
  },
  focus: {
    eyebrow: "CURRENT INTERESTS",
    title: "注意力落在这些地方",
    items: [
      {
        id: "design",
        category: "DESIGN",
        title: "少一点打扰，多一点呼吸",
        summary: "琢磨文字、留白与动效，让页面安静地承载内容。",
        description: "琢磨文字、留白与动效之间的关系，让一个页面既有自己的表情，也能安静地承载内容。",
        detail: "正在关注：界面层次 / 阅读节奏 / 细微动效",
      },
      {
        id: "reading",
        category: "READING",
        title: "沿着一段文字走远一点",
        summary: "在随笔与长文章之间，留意具体场景和普通人的感受。",
        description: "在随笔和长文章之间来回，留意具体的场景与普通人的感受。好的文字，常常把熟悉的事物重新照亮。",
        detail: "正在关注：个人叙事 / 城市生活 / 观察与表达",
      },
      {
        id: "listening",
        category: "LISTENING",
        title: "给日常留一条背景声轨",
        summary: "一点器乐与环境声，陪伴阅读和独处。",
        description: "让器乐、环境声与轻柔的旋律陪伴阅读和独处。有时并不需要听清每一个音符，只需要一点恰当的声音。",
        detail: "正在关注：器乐 / 氛围音乐 / 原声配乐",
      },
    ],
  },
  rhythm: {
    eyebrow: "A SLOWER RHYTHM",
    title: "理想中的一天",
    description: "不用把每一分钟填满，留一些时间给偶然。",
    items: [
      { time: "清晨", title: "从安静开始", text: "一杯热饮，一点自然光，给新的一天留一个缓慢的开场。" },
      { time: "午后", title: "把注意力放近", text: "读几页书，整理一段想法，认真完成手边的一件小事。" },
      { time: "夜晚", title: "给今天一个句点", text: "放一首歌，记下值得留下的片刻，再把未完成的事交给明天。" },
    ],
  },
} as const;
