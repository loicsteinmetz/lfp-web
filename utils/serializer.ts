export const s = <T>(data: T): typeof data => JSON.parse(JSON.stringify(data));
