module.exports = (skillname) =>`
//const template = require('./../template/${skillname}.template');
const middleware = require('./../middleware')

process.byt = { events: { emit: () => {}}};  // prevents on throwing events on test

describe('Handler Test for ${skillname} handler', () => {
  it('basic intent of ${skillname} handler shout provide output', async () => {
    const UNO = { intent: '${skillname}', entities: []};
    const result = await middleware(UNO);
    expect(result).toBeDefined();
    expect(result.response).not.toMatch(/undefined/);
    // expect(template.includes(result)).toBe(true);
    expect(['One answer', 'some other answer'].includes(result.response)).toBe(true);
  })
})

`
