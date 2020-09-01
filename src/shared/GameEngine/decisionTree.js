// data = {
//   initial: [array of initial choices],
//   choices: {
//     choices with the key being the choice with an array, children
//   }
// }

export const DecisionTree = function (data) {
  this.initial = data.initial;
  this.choices = data.choices;

  // Return an array of choice objects for the root of the tree
  this.getInitial = function () {
    if (!this.initial)
      throw new Error("DecisionTree: no initial choice(s) specified");
    return this.getChoices(this.initial);
  };

  // Get full choice data by specific id
  this.getChoice = function (id) {
    if (!(id in this.choices)) return false;
    if (!("id" in this.choices[id])) this.choices[id].id = id;
    return this.choices[id];
  };

  // As above, but passing an array of choice IDs
  this.getChoices = function (idList) {
    if (!idList) return [];
    let list = [];
    for (let i = 0; i < idList.length; i++) {
      let childChoice = this.getChoice(idList[i]);
      list.push(childChoice);
    }
    return list;
  };

  // Get an array of choice data for a parent id
  this.getChildren = function (parentId) {
    if (!(parentId in this.choices)) return false;
    if (!("children" in this.choices[parentId])) return false;

    let childIds = this.choices[parentId].children;
    return this.getChoices(childIds);
  };

  // Init - insert ids into choice objects, check dups, associate parents, etc
  this.init = function () {
    let idList = [];
    for (let k in this.choices) {
      if (idList.indexOf(k) !== -1)
        throw new Error('DecisionTree: duplicate ID "' + k + '" in choice set');
      let choice = this.getChoice(k);
      choice.id = k;

      let children = this.getChildren(k);
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.parent)
          throw new Error(
            'DecisionTree: tried to assign parent "' +
              k +
              '" to child "' +
              choice.children[i] +
              '" which already has parent "' +
              child.parent +
              '"'
          );
        child.parent = k;
      }
    }
  };
};
