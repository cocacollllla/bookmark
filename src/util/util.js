export const authorSlice = (author) => {
  const findIdx = author.indexOf('(');
  return author.slice(0, findIdx);
}
