const drivePreviewUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;
const driveViewUrl = (id) => `https://drive.google.com/file/d/${id}/view`;
function driveIdFromUrl(input) {
  const value = input.trim();
  return value.match(/\/d\/([\w-]+)/)?.[1] ?? value.match(/[?&]id=([\w-]+)/)?.[1] ?? (/^[\w-]{20,}$/.test(value) ? value : null);
}
export {
  drivePreviewUrl as a,
  driveViewUrl as b,
  driveIdFromUrl as d
};
