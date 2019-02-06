'use strict';

/**
 * Change object property value
 * @param {Object} object - object to update property
 * @param {string} path - path to property
 * @param {*} value - new property value
 * @returns {Object} - updated object
 */
const set = (object, path, value) => {
    const pathArray = path.split("."); // Split path string into properties
    const pathArrayLength = pathArray.length;

    // Ignore path without '.'
    if (pathArrayLength < 2) {
        return object
    }

    // Drop fist empty property and get an object with last property
    const propertyValue = pathArray.slice(1, pathArrayLength - 1).reduce(function (currentPropertyValue, nextPropertyName) {
        // if property doesn't exist in current object, set it to empty object
        if (!currentPropertyValue.hasOwnProperty(nextPropertyName)) {
            currentPropertyValue[nextPropertyName] = {};
        }
        return currentPropertyValue[nextPropertyName]
    }, object);

    propertyValue[pathArray[pathArrayLength - 1]] = value;
    return object
};
