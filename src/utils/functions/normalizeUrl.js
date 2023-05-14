export function normalizeUrl(str) {
  console.log(
    'URL',
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(' ', '-')
      .toLowerCase()
  );
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '-')
    .replaceAll('/', '-')
    .replaceAll('.', '-')
    .toLowerCase();
}
