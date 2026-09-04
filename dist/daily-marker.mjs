export const STORAGE_KEY = 'daily-marker.note';
export const MAX_LENGTH = 40;

export function validateNote(value) {
  const trimmed = value.trim();
  if (!trimmed) return { ok: false, message: 'Enter a note before saving.' };
  if (trimmed.length > MAX_LENGTH) return { ok: false, message: `Keep your note to ${MAX_LENGTH} characters or fewer.` };
  return { ok: true, value: trimmed };
}

export function loadNote(storage) {
  try {
    const value = storage.getItem(STORAGE_KEY);
    return value && value.trim() ? value : '';
  } catch { return ''; }
}

export function saveNote(storage, value) {
  const result = validateNote(value);
  if (result.ok) storage.setItem(STORAGE_KEY, result.value);
  return result;
}

export function clearNote(storage) { storage.removeItem(STORAGE_KEY); }
