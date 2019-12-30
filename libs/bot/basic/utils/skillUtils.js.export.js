module.exports = `
const _isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const _setOutputText = (uno, text) => {
  return {...uno, answer: text};
};

const _getPreviousIntentNotYesOrNo = (uno) => {
  if(uno.previous && uno.previous.intents) {
    return uno.previous.intents.filter(intent => intent !== 'yes' && intent != 'no')[0];
  }
};

const _getMatchingEntityCurrent = (uno, entityName) => {
  const matchedEntity = uno.current.entities.filter(entity => {
    return entity.entity === entityName;
  })[0];
  return matchedEntity && matchedEntity.value;
};

const _getMatchingEntityHistory = (uno, entityName) => {
  const current = _getMatchingEntityCurrent(uno, entityName);
  if(current) return current;
  if(uno.previous && !_isEmpty(uno.previous.entities) && uno.previous.entities.hasOwnProperty(entityName)) {
    return uno.previous.entities[entityName];
  }
  return;
};

const _getIntentHistoryUpToIntent = (uno, intentName) => {
  const intentHistory = [];
  if(uno.previous && uno.previous.intents) {
    for(let finder = 0; finder < uno.previous.intents.length; finder++ ) {
      if(uno.previous.intents[i] === intentName) {
        intentHistory = uno.previous.intents.slice(0, finder);
        break;
      }
    }
  }
  return intentHistory;
};

const _getConversationDepth = (uno, intentName) => {
  return _getIntentHistoryUpToIntent(uno, intentName).length;
};

const _getCurrentIntent = (uno) => {
  return uno.current.intent;
};

const _getPreviousIntent = (uno) => {
  return uno.previous.intent[0];
};

const _endOfConversation = (uno) => {
  return {...uno, eoc: true};
};

const _saveContext = (uno) => {
  const maxContextLength = 5;
  let save = {...uno};
  if(!save.previous) save.previous = {};
  if(!save.previous.intents) save.previous.intents = [];
  if(!save.previous.entities) save.previous.entities = [];
  if(!save.eoc) {
    if(!save.current) save.current = { entities: []};
    save.current.intent && save.previous.intents.unshift(save.current.intent);
    save.previous.entities = [...save.previous.entities, ...save.current.entities];
    if(save.previous.intents.length > maxContextLength) save.previous.intents.pop();
  } else {
    save.previous = {};
  }
  return save;
};

module.exports = {
  _setOutputText,
  _getCurrentIntent,
  _getPreviousIntent,
  _getMatchingEntityCurrent,
  _getMatchingEntityHistory,
  _endOfConversation,
  _getPreviousIntentNotYesOrNo,
  _getConversationDepth,
  _getMatchingEntityHistory,
  _saveContext
};
`;
