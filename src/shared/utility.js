export function areEqual() {
  let len = arguments.length;
  for (let i = 1; i < len; i++) {
    if (arguments[i] === "" || arguments[i] !== arguments[i - 1]) {
      return [arguments[i], false];
    }
  }
  return [arguments[0], true];
}
