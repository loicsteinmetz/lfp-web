export const s = <T>(data: T): typeof data => JSON.parse(JSON.stringify(data));

export const str = (str?: string) => str
  ? str
    .replace(/ ;/g, '\u00A0;')
    .replace(/ :/g, '\u00A0:')
    .replace(/ !/g, '\u00A0!')
    .replace(/ \?/g, '\u00A0?')
  : '';
