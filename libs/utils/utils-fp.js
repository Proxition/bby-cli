module.exports = `
const compose = (f, g) => (...args) => f(g(...args));
const pipe = (f, g) => (...args) => g(f(...args));

const composeAll = (...functions) => functions.reduce(compose);
const pipeAll = (...functions) => functions.reduce(pipe);

module.exports = {
  pipe,
  compose,
  composeAll,
  pipeAll
}
`
