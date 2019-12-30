module.exports = (skillname) => `
const handler = require('./../services/handle');
//const template = require('./../template/${skillname}.template');


describe("Handler Test for ${skillname} handler", async () => {
  it("basic intent of ${skillname} handler should provide output no middleware", () => {
    const UNO = { intent: "${skillname}", entities: []};
    const result = handler.handle(UNO, () => {return {}});
    expect(result).toBeDefined();
    expect(result).not.toMatch(/undefined/);
    // expect(template.includes(result)).toBe(true);
    expect(['One answer', 'some other answer'].includes(result)).toBe(true);
  })
})

`
