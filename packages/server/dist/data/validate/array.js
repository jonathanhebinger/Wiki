"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArray = void 0;
const data_1 = require("./data");
function validateArray(nodes, type, value) {
    var _a, _b;
    if (!Array.isArray(value))
        return false;
    const minLength = (_a = type.minLength) !== null && _a !== void 0 ? _a : 0;
    const maxLength = (_b = type.maxLength) !== null && _b !== void 0 ? _b : Infinity;
    if (minLength > value.length)
        return false;
    if (maxLength < value.length)
        return false;
    return value.every(item => {
        return data_1.validateData(nodes, type.of, item);
    });
}
exports.validateArray = validateArray;
