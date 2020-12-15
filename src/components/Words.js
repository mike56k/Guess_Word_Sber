const animals = [
  "собака",
  "кошка",
  "олень",
  "слон",
  "змея",
  "носорог",
  "медведь",
  "волк",
  "петух",
  "коза",
  "корова",
  "овца",
  "жираш",
  "обезьяна",
  "лама",
];

function randomWord() {
  return animals[Math.floor(Math.random() * animals.length)];
}

export { randomWord };
