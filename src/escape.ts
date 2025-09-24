export const escape = (text: string): string => {
  const parse = text.replace(
    /([_*\[\]()~`>\#\+\-=|\.!\{\}\\])/g,
    "\\$1"
  );
  const reparse = parse.replace(
    /\\\\([_*\[\]()~`>\#\+\-=|\.!\{\}\\])/g,
    "$1"
  );
  return reparse;
};