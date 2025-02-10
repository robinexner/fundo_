/*
 * This file is part of the fundo_ project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/fundo_
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */

/**
 * Checks if a value is an array.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is an array, false otherwise.
 */
function isArray(value) {
    return Array.isArray(value);
}

/**
 * Checks if a value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is an object, false otherwise.
 */
function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

/**
 * Checks if a value is a string.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * Checks if a value is a number.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a number, false otherwise.
 */
function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

/**
 * Checks if a value is a function.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a function, false otherwise.
 */
function isFunction(value) {
    return typeof value === 'function';
}

/**
 * Deep clones an object.
 * @param {Object} obj - The object to clone.
 * @returns {Object} The cloned object.
 * @throws {TypeError} If the input is not an object.
 */
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new TypeError('Input must be an object');
    }
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The generated random integer.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Debounces a function.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The debounce delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Throttles a function.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The throttle limit in milliseconds.
 * @returns {Function} The throttled function.
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Checks if an object is empty.
 * @param {Object} obj - The object to check.
 * @returns {boolean} True if the object is empty, false otherwise.
 */
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Loads a CSS file dynamically if it hasn't been loaded yet.
 * If the URL is relative, it loads the CSS file relative to the current script location.
 * @param {string} url - The URL or relative path of the CSS file.
 */
function loadCSS(url) {
    let cssPath = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        const scriptElements = document.getElementsByTagName('script');
        const currentScript = scriptElements[scriptElements.length - 1];
        const scriptPath = currentScript.src;
        cssPath = scriptPath.substring(0, scriptPath.lastIndexOf('/')) + '/' + url;
    }
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
        appendCSSLink(cssPath);
    }
}

/**
 * Creates a link element for a CSS file and appends it to the document head.
 * @param {string} href - The href attribute for the link element.
 */
function appendCSSLink(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

/**
 * Generates a unique ID.
 * @param {string} [prefix='id'] - The prefix for the ID.
 * @returns {string} The generated unique ID.
 */
function generateUniqueId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export {
    isArray,
    isObject,
    isString,
    isNumber,
    isFunction,
    deepClone,
    getRandomInt,
    debounce,
    throttle,
    isEmptyObject,
    loadCSS,
    generateUniqueId
};