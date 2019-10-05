import format from 'date-fns/format';

export default function (el: HTMLElement) {
  el.innerHTML = format(new Date(el.innerHTML), 'yyyy-MM-dd');
}
