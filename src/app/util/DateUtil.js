const type = new Map([
  [0, "휴가"],
  [1, "외부 교육"],
]);

const subType = new Map([
  ["하루 종일", 0],
  ["오전", 1],
  ["오후", 2],
]);

export const convartKST = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};

export const getType = (typeNumber) => {
  return type.get(typeNumber);
};
