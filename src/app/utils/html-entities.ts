/** Decode HTML entities from LMS strings (e.g. `&#36;` / `&amp;#36;` → `$`). */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';

  let value = String(text);

  // Run twice so double-encoded values like `&amp;#36;` become `$`.
  for (let i = 0; i < 2; i++) {
    value = value
      .replace(/&amp;/g, '&')
      .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/&dollar;/gi, '$')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  if (typeof document !== 'undefined' && /&[a-zA-Z]+;|&#/.test(value)) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    value = textarea.value;
  }

  return value;
}
