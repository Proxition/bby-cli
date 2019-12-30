module.exports=`
const testResultTextOnTemplate = (template, resultText) => {
  if(typeof template === "string") {
    expect(resultText).toMatch(template);
  } else if(typeof template === "function") {
    let toTestOn = template({}).split("undefined")[0];
    expect(resultText).toMatch(toTestOn);
  } else if(template.includes) {
    expect(template.includes(resultText)).toBe(true);
  }
};

module.exports = {
  testResultTextOnTemplate
};
`;
