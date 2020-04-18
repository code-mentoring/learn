/**
 * Remove all specified keys from an object, no matter how deep they are.
 * The removal is done in place, so run it on a copy if you don't want to modify the original object.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param objOrArray The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 */
export const removeKeys = (objOrArray: object | object[], keys: string[]): object | object[] => {
  let index;
  if (objOrArray instanceof Array) return objOrArray.map(o => removeKeys(o, keys));
  for (const p in objOrArray) {
    const prop = p as keyof typeof objOrArray;
    // important check that this is objects own property
    // not from prototype prop inherited
    if (objOrArray.hasOwnProperty(prop)) {
      switch (typeof (objOrArray[prop])) {

        case 'string':
        case 'boolean':
        case 'function':
        case 'number':
          index = keys.indexOf(prop);
          if (index > -1) delete objOrArray[prop];
          break;

        case 'object':
          index = keys.indexOf(prop);
          if (index > -1) delete objOrArray[prop];
          else removeKeys(objOrArray[prop], keys);
          break;
      }
    }
  }
  return objOrArray;
};
