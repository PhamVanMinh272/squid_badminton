export function getDays(year: number, month: number, dayIndexs: number[]) {
  let dates: Date[] = [];
  const date = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= endDate; day++) {
    const today = new Date();
    date.setDate(day);
    if (date >= today && dayIndexs.includes(date.getDay())) {
      dates.push(new Date(date));
      if (dates.length >= 2) {
        break;
      }
    }
  }

  return dates;
}
