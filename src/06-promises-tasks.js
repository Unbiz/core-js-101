/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  return new Promise((res, rej) => {
    if (isPositiveAnswer === true) {
      res('Hooray!!! She said "Yes"!');
    }
    if (isPositiveAnswer === false) {
      res('Oh no, she said "No".');
    }
    if (isPositiveAnswer !== true && isPositiveAnswer !== false) {
      rej(new Error('Wrong parameter is passed! Ask her again.'));
    }
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return new Promise((res) => res(Promise.all(array)));
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return new Promise((res) => res(Promise.race(array)));
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
function chainPromises(/* array, action */) {
  // return new Promise((res) => {
  //   let result = '';
  //   array.forEach((item, i) => {
  //     item.then((el) => {
  //       if (i === 0) {
  //         if (typeof el === 'number') result = 0;
  //       }
  //       result = action(result, el);
  //       if (i === array.length - 1) {
  //         console.log('aaaa', result);
  //         res(result);
  //       }
  //     });
  //   });
  // }).catch((er) => new Error(er));
  throw new Error('Not implemented');
}


// let result = '';
// // eslint-disable-next-line no-restricted-syntax
// for (const item of array) {
//   const temp = result;
//   // eslint-disable-next-line no-loop-func
//   item.then((res) => {
//     result = action(temp, res);
//   });
// }


// const result = array.reduce(async (acc, item) => {
//   let val = '';
//   await item.then(async (r) => {
//     val = action(acc, r);
//   });
//   console.log('mmm', val);
//   return val;
// }, '');
// console.log('zzzz', result);
// for (item in array) {
//   if (Object.prototype.hasOwnProperty.call(array, item)) {
//     const temp = result;
//     result += item.then((res) => action(temp, res));
//   }
// }


// let xx = '';
// await result.then(async (e) => {
//   xx = await e;
// });
// console.log('aaa', xx);
// return new Promise((res) => res(xx));

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
