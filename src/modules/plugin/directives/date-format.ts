import format from 'date-fns/format';

export default function (el: HTMLElement) {
  if (isNaN(new Date(el.innerHTML).getTime())) {
    return;
  }
  el.innerHTML = format(new Date(el.innerHTML), 'yyyy-MM-dd');
}
