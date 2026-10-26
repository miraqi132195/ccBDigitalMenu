const EDGE_BIDI_MARKS = /^[\u200e\u200f\u202a-\u202e\u2066-\u2069\s]+|[\u200e\u200f\u202a-\u202e\u2066-\u2069\s]+$/g;

export function displayText(value) {
  if (value == null) return '';
  return String(value).replace(EDGE_BIDI_MARKS, '');
}
