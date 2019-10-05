export function parseISO (targetDate: Date) {
  const year = targetDate.getUTCFullYear();
  const month = pad(targetDate.getMonth() + 1);
  const date = pad(targetDate.getDate());
  const hours = pad(targetDate.getHours());
  const minutes = pad(targetDate.getMinutes());
  console.log(year, month, date);

  return removeEmptyArea(`
    ${year}-
    ${month}-
    ${date}T
    ${hours}:
    ${minutes}
  `)
}

function removeEmptyArea (targetString: string) {
  return targetString.replace(/(\s*)/g, "");
}

function pad (targetNumber: number): string {
  return targetNumber < 10 ? `0${targetNumber}` : targetNumber.toString();
}
