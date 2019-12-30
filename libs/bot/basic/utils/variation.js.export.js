module.exports = `
const variation = (template) => {
  if (typeof template == "object") {
    return template[Math.floor(Math.random() * template.length)];
  } else
    return template;
};

module.exports = variation
`
