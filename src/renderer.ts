import type { Renderer, Token } from "markdown-it";

export const telegramMarkdownV2Renderer: Renderer.RenderRuleRecord = {
  strong_open: () => "*",
  strong_close: () => "*",
  em_open: () => "_",
  em_close: () => "_",
  s_open: () => "~",
  s_close: () => "~",
  link_open: () => "[",
  link_close: (tokens: Token[], idx: number) => {
    const href = tokens[idx - 2].attrGet("href");
    return `](${href || ""})`;
  },
  code_inline: (tokens: Token[], idx: number) => {
    return `\`${tokens[idx].content}\``;
  },
  fence: (tokens: Token[], idx: number) => {
    const token = tokens[idx];
    const lang = token.info ? token.info.split(/(\s+)/g)[0] : '';
    return '```' + lang + '\n' + token.content + '```';
  },
  paragraph_open: () => "",
  paragraph_close: () => "",
  text: (tokens: Token[], idx: number) => {
    return tokens[idx].content;
  },
};