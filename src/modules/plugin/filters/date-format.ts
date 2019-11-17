import format from 'date-fns/format';
import { INullable } from "@/@types/utility";

export default function (value: INullable<Date>) {
  if (!value) {
    return "-";
  }
  if (isNaN(new Date(value).getTime())) {
    return "유효하지 않은 날짜입니다."
  }
  return format(new Date(value), 'yyyy-MM-dd')
}
