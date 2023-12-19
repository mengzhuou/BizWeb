export const formatBirthday = (birthday) => {
  let strNum = String(birthday);

  const day = strNum.slice(8, 10);
  const month = strNum.slice(5, 7);
  const year = strNum.slice(0, 4);

  return `${month}-${day}-${year}`;
};

export const formatPhoneNumber = (phoneNumber) => {
  let strNum = String(phoneNumber);

  const country = strNum.slice(0, 1);
  const part1 = strNum.slice(1, 4);
  const part2 = strNum.slice(4, 7);
  const part3 = strNum.slice(7, 11);

  return `(+${country}) ${part1} ${part2} ${part3}`;
};
