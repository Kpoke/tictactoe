interface Choice {
  id?: string;
  parent?: string;
  children?: string[];
}

interface DecisionTreeData {
  initial: string[];
  choices: Record<string, Choice>;
}

export class DecisionTree {
  private initial: string[];
  private choices: Record<string, Choice>;

  constructor(data: DecisionTreeData) {
    this.initial = data.initial;
    this.choices = data.choices;
  }

  // Return an array of choice objects for the root of the tree
  getInitial(): Choice[] {
    if (!this.initial)
      throw new Error("DecisionTree: no initial choice(s) specified");
    return this.getChoices(this.initial);
  }

  // Get full choice data by specific id
  getChoice(id: string): Choice | false {
    if (!(id in this.choices)) return false;
    if (!("id" in this.choices[id])) this.choices[id].id = id;
    return this.choices[id];
  }

  // As above, but passing an array of choice IDs
  getChoices(idList: string[]): Choice[] {
    if (!idList) return [];
    let list: Choice[] = [];
    for (let i = 0; i < idList.length; i++) {
      const childChoice = this.getChoice(idList[i]);
      if (childChoice !== false) {
        list.push(childChoice);
      }
    }
    return list;
  }

  // Get an array of choice data for a parent id
  getChildren(parentId: string): Choice[] | false {
    if (!(parentId in this.choices)) return false;
    if (!("children" in this.choices[parentId])) return false;

    let childIds = this.choices[parentId].children!;
    return this.getChoices(childIds);
  }

  // Init - insert ids into choice objects, check dups, associate parents, etc
  init(): void {
    let idList: string[] = [];
    for (let k in this.choices) {
      if (idList.indexOf(k) !== -1)
        throw new Error('DecisionTree: duplicate ID "' + k + '" in choice set');
      let choice = this.getChoice(k);
      if (choice === false) continue;
      choice.id = k;

      let children = this.getChildren(k);
      if (children === false) continue;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.parent)
          throw new Error(
            'DecisionTree: tried to assign parent "' +
              k +
              '" to child "' +
              this.choices[k].children![i] +
              '" which already has parent "' +
              child.parent +
              '"'
          );
        child.parent = k;
      }
    }
  }
}
