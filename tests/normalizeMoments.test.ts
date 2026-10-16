import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMoment, normalizeMomentsResponse } from "../src/utils/normalizeMoments.ts";

test("accepts array and supported CMS envelopes, including an empty list", () => {
  for (const response of [[{ time: 0 }], { data: [{ time: 0 }] }, { moments: [{ time: 0 }] }]) {
    assert.equal(normalizeMomentsResponse(response)[0]?.time, 0);
  }
  assert.deepEqual(normalizeMomentsResponse([]), []);
});
test("filters invalid entries without losing valid records", () => {
  assert.equal(normalizeMomentsResponse([null, 42, {}, { time: "2026-10-12T00:00:00Z" }]).length, 1);
  for (const value of [null, {}, { time: Infinity }, { time: "" }, { time: "invalid" }]) assert.equal(normalizeMoment(value), null);
  assert.throws(() => normalizeMomentsResponse([null]));
  assert.throws(() => normalizeMomentsResponse({ data: {} }));
});
test("validates nested JSON, rejects unsafe URLs and object-valued text", () => {
  const item = normalizeMoment({ time: 1, content: { zh: {} }, tags: '["日常",null,{},"日常"]', media: '[null,{"type":"img","url":"javascript:alert(1)"},{"type":"img","url":"https://example.com/photo.jpg"}]', music: '{"title":{},"artist":"A","url":"https://example.com/a.mp3"}' });
  assert.equal(item?.content, undefined);
  assert.deepEqual(item?.tags, ["日常"]);
  assert.equal(item?.media?.length, 1);
  assert.equal(item?.music, undefined);
});
test("keeps multilingual content and tolerates malformed optional JSON", () => {
  const item = normalizeMoment({ time: "123", content: { zh: "你好" }, tags: "bad json", media: "bad json" });
  assert.deepEqual(item?.content, { zh: "你好", en: "" });
  assert.deepEqual(item?.media, []);
});
