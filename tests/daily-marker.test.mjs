import test from 'node:test';
import assert from 'node:assert/strict';
import { clearNote, loadNote, saveNote, STORAGE_KEY } from '../src/daily-marker.mjs';

const storage = () => { const data = new Map(); return { getItem: k => data.get(k) ?? null, setItem: (k, v) => data.set(k, v), removeItem: k => data.delete(k) }; };
test('saves a trimmed note and reloads it', () => { const s = storage(); assert.deepEqual(saveNote(s, '  make space  '), { ok: true, value: 'make space' }); assert.equal(loadNote(s), 'make space'); });
test('rejects blank input without writing', () => { const s = storage(); assert.equal(saveNote(s, ' \t ' ).ok, false); assert.equal(s.getItem(STORAGE_KEY), null); });
test('rejects notes over forty characters', () => { const s = storage(); assert.equal(saveNote(s, 'a'.repeat(41)).ok, false); assert.equal(s.getItem(STORAGE_KEY), null); });
test('accepts the forty-character boundary', () => { const s = storage(); const note = 'a'.repeat(40); assert.deepEqual(saveNote(s, note), { ok: true, value: note }); assert.equal(loadNote(s), note); });
test('normalizes legacy whitespace around a stored note', () => { const s = storage(); s.setItem(STORAGE_KEY, '  keep this  '); assert.equal(loadNote(s), 'keep this'); });
test('clear removes the saved note', () => { const s = storage(); saveNote(s, 'done'); clearNote(s); assert.equal(loadNote(s), ''); });
