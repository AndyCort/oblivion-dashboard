import test from "node:test";
import assert from "node:assert/strict";
import { parseAudioUrl } from "../src/utils/audioUrl.ts";

test("preserves signed URLs and decodes the track filename", () => {
  const track = parseAudioUrl("  https://example.com/%E9%9F%B3%E4%B9%90.mp3?token=abc%2F123  ");
  assert.equal(track.url, "https://example.com/%E9%9F%B3%E4%B9%90.mp3?token=abc%2F123");
  assert.equal(track.title, "音乐.mp3");
});
test("supports extensionless streams and HTTP without guessing formats", () => {
  assert.equal(parseAudioUrl("http://localhost:8000/live").title, "live");
  assert.equal(parseAudioUrl("https://example.com").title, "链接音频");
});
test("rejects invalid and non-web URLs", () => {
  for (const url of ["", "a.mp3", "javascript:alert(1)", "file:///music.mp3", "data:audio/wav;base64,abc"]) {
    assert.throws(() => parseAudioUrl(url));
  }
});
