export function formatTime(time: number) {
  const date = new Date(time);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "刚刚";
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`;
  }

  // 昨天
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  // 前天
  const beforeYesterday = new Date(now);
  beforeYesterday.setDate(now.getDate() - 2);

  if (date.toDateString() === beforeYesterday.toDateString()) {
    return `前天 ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  // 今年：不显示年份
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  // 往年：显示年份
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
}
