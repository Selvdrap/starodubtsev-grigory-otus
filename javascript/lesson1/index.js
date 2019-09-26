"use strict";

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function sum(...args) {
  let result = null;

  if (args.length > 0) {
    args = args.flat();
    result = args.reduce((total, current) => (total += +current), result);

    return function f(...args2) {
      if (args2.length > 0) {
        args2 = args2.flat();
        result = args2.reduce((total, current) => (total += +current), result);
        return f;
      }

      if (!isNumeric(+result))
        throw new TypeError(
          "All arguments must be numbers or arrays containing numbers"
        );
      return result;
    };
  }

  if (!result) throw new TypeError("At least one numeric argument is expected");
}
