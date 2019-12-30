module.exports = (skillname) => `
const templates = require("./../templates/templates.js");
const {
  _getCurrentIntent,
  _getMatchingEntityCurrent,
  _getPreviousIntent,
  _getMatchingEntityHistory,
  _setOutputText,
  _endOfConversation,
  _getPreviousIntentNotYesOrNo,
  _getConversationDepth,
} = require("./../utils/skillUtils");


module.exports = [
  handler(
      (input) => _getCurrentIntent(input) === "${skillname}" && _getMatchingEntityCurrent(input, "quantity") > 15, // more detailed ones have to be above more general ones
      (input) => \`You want too much.\`
  ),
  handler(
      (input) => _getCurrentIntent(input) === "${skillname}", // less details
      (input) => [\`Which \${input.intent} do you like to order? We have a, b and c.\`, "some other answer"]
  )
];

function handler(conditionFn, handlerFn) {
  return {
      canHandle: conditionFn,
      handle: handlerFn,
  };
};
`
