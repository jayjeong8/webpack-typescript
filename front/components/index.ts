import '@styles/styles.scss';

function component() {
  const element = document.createElement('div');

  element.innerHTML = ['타입스크립트', '웹팩'].join(' ');

  const includes = [1, 2, 3, 4, 5].includes(1);
  const includeEl = document.createElement('div');
  includeEl.innerHTML = '1';
  includes && element.appendChild(includeEl);

  const a: string = '111';
  const b: number = 111;

  function test(pram1: string, pram2: number) {}
  return element;
}

document.body.appendChild(component());
