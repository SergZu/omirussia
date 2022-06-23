const initValue = "432524";
let value = initValue;
for (let i = 1; i < initValue.length + 1; i++) {
  const target = document.querySelector(`.js-digits-${i}`);
  target.style.marginTop = `-${initValue[i - 1]}em`;
}
setInterval(() => {
  const newValue = `${Number(value) + Math.round(Math.random() * 3 + 2)}`;
  value = newValue;
  for (let i = 1; i < newValue.length + 1; i++) {
    const target = document.querySelector(`.js-digits-${i}`);
    target.style.marginTop = `-${newValue[i - 1]}em`;
  }
}, 4000);
