/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea: () => width * height,
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function twiceError() {
  throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
}

function orderError() {
  throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
}

class BaseSelector {
  constructor() {
    this.selector = '';
    this.hasElement = false;
    this.hasId = false;
    this.hasPseudoElement = false;
    this.position = 0;
  }

  element(value) {
    if (this.hasElement) twiceError();
    if (this.position !== 0) orderError();
    this.selector += `${value}`;
    this.hasElement = true;
    this.position = 1;
    return this;
  }

  id(value) {
    if (this.hasId) twiceError();
    if (this.position > 1) orderError();
    this.selector += `#${value}`;
    this.hasId = true;
    this.position = 2;
    return this;
  }

  class(value) {
    if (this.position > 3) orderError();
    this.selector += `.${value}`;
    this.position = 3;
    return this;
  }

  attr(value) {
    if (this.position > 4) orderError();
    this.selector += `[${value}]`;
    this.position = 4;
    return this;
  }

  pseudoClass(value) {
    if (this.position > 5) orderError();
    this.selector += `:${value}`;
    this.position = 5;
    return this;
  }

  pseudoElement(value) {
    if (this.hasPseudoElement) twiceError();
    this.selector += `::${value}`;
    this.hasPseudoElement = true;
    this.position = 6;
    return this;
  }

  stringify() {
    return this.selector;
  }
}

const cssSelectorBuilder = {
  element(value) {
    if ('selector' in this) {
      return this.element(value);
    }
    return new BaseSelector().element(value);
  },

  id(value) {
    if ('selector' in this) {
      return this.id(value);
    }
    return new BaseSelector().id(value);
  },

  class(value) {
    if ('selector' in this) {
      return this.class(value);
    }
    return new BaseSelector().class(value);
  },

  attr(value) {
    if ('selector' in this) {
      return this.attr(value);
    }
    return new BaseSelector().attr(value);
  },

  pseudoClass(value) {
    if ('selector' in this) {
      return this.pseudoClass(value);
    }
    return new BaseSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    if ('selector' in this) {
      return this.pseudoElement(value);
    }
    return new BaseSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new BaseSelector().element(`${selector1.stringify()} ${combinator} ${selector2.stringify()}`);
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
