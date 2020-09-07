// @flow

export function quoteRegExpPattern(s: any) {
  return (
    String(s)
      .replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1")
      // eslint-disable-next-line
      .replace(/\x08/g, "\\x08")
  );
}

export function getBoardPositions(s: string) {
  let results = [];
  const reg = new RegExp(/\b([A-HJ-T])([1][0-9]|[1-9])\b/gi);

  let matchInfo = reg.exec(s);
  while (matchInfo !== null) {
    results.push(matchInfo);
    matchInfo = reg.exec(s);
  }

  return results;
}

export function nl2br(s: string) {
  return s.toString().replace(/\r\n|\r|\n/gm, "<br>");
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function escapeUnicode(s: string) {
  let ret = "";
  let code;
  for (let i = 0; i < s.length; i++) {
    code = s.charCodeAt(i);
    if (code < 128) {
      ret += s.charAt(i);
    } else {
      ret += "\\u" + ("0000" + code.toString(16)).substr(-4);
    }
  }
  return ret;
}
