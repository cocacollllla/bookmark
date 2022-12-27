export const authorSlice = (author) => {
  const findIdx = author.indexOf("(");
  return author.slice(0, findIdx);
};

export const monthlyGroup = (bookList) => {
  const addDate = bookList.map((el) => {
    const str = el.endDate.slice(0, 7);
    return { ...el, date: str };
  });

  const groupValues = addDate.reduce((acc, current) => {
    acc[current.date] = acc[current.date] || [];
    acc[current.date].push(current);
    return acc;
  }, {});

  const groups = Object.keys(groupValues).map((key) => {
    return { date: key, list: groupValues[key] };
  });

  const sortedList = groups.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedList;
};
