module.exports = (templatename) => `
const ${templatename} = \`This template was created with BBy-Cli.\`;

const ${templatename}function = (value) => \`This template was created with BBy-Cli and \${value}.\`;


module.exports = { ${templatename} };
`
