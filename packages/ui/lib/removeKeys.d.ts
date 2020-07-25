/**
 * Remove all specified keys from an object, no matter how deep they are.
 * The removal is done in place, so run it on a copy if you don't want to modify
 * the original object.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param objOrArray The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 */
export declare const removeKeys: (objOrArray: object | object[], keys: string[]) => object | object[];
