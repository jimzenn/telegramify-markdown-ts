import { markdownify } from '../src/index';

describe('markdownify', () => {
  it('should correctly format bold text', () => {
    expect(markdownify('**bold text**')).toBe('*bold text*');
  });

  it('should correctly format italic text', () => {
    expect(markdownify('*italic text*')).toBe('_italic text_');
  });

  it('should correctly format strikethrough text', () => {
    expect(markdownify('~~strikethrough text~~')).toBe('~strikethrough text~');
  });

  it('should correctly format a link', () => {
    expect(markdownify('[example](http://example.com)')).toBe('[example](http://example\\.com)');
  });

  it('should correctly format inline code', () => {
    expect(markdownify('`const x = 1;`')).toBe('`const x = 1;`');
  });

  it('should correctly format a code block', () => {
    const code = '```\nconst x = 1;\n```';
    const expected = '```\nconst x = 1;\n```';
    expect(markdownify(code)).toBe(expected);
  });

  it('should escape special characters', () => {
    expect(markdownify('Hello. World!')).toBe('Hello\\. World\\!');
  });

  it('should correctly format bold text with underscore italic text', () => {
    expect(markdownify('**bold_text with _italic text_**')).toBe('*bold\\_text with _italic text_*');
  });

  it('should correctly format italic text with asterisk bold text', () => {
    expect(markdownify('_italic_text with **bold text**_')).toBe('_italic\\_text with *bold text*_');
  });
});