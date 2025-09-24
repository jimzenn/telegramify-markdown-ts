import MarkdownIt from "markdown-it";
import { telegramMarkdownV2Renderer } from "./renderer";
import { escape } from "./escape";
import type { Token } from "markdown-it";

const escapeTokens = (tokens: Token[]) => {
  for (const token of tokens) {
    if (token.type === "text") {
      token.content = escape(token.content);
    }
    if (token.type === "link_open") {
      const href = token.attrGet("href");
      if (href) {
        token.attrSet("href", escape(href));
      }
    }
    if (token.children) {
      escapeTokens(token.children);
    }
  }
};

export const markdownify = (text: string): string => {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: false,
  });

  md.renderer.rules = telegramMarkdownV2Renderer;

  const tokens = md.parse(text, {});
  escapeTokens(tokens);

  return md.renderer.render(tokens, md.options, {}).trim();
};