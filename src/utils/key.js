const pluralize = require("pluralize");
const changeCase = require("change-case");

/**
 * Helper class to convert strings from one format to another
 * @constructor takes in the raw string to be processed
 */
class Key {
  constructor(key) {
    this.raw = key;
  }

  get singular() {
    return new Key(pluralize.singular(this.raw));
  }

  get plural() {
    return new Key(pluralize.plural(this.raw));
  }

  get capitalize() {
    return new Key(changeCase.pascalCase(this.raw));
  }

  get camelcase() {
    return new Key(changeCase.camelCase(this.raw));
  }

  get array() {
    return `[${this.raw}]`;
  }

  toString() {
    return this.raw;
  }

  get isDefectiveNoun() {
    return (
      `${pluralize.singular(this.raw)}` === `${pluralize.plural(this.raw)}`
    );
  }
}

module.exports = Key;
