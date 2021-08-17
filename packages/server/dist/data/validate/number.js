"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumber = void 0;
function validateNumber(type, value) {
    var _a, _b;
    if (typeof value !== 'number')
        return false;
    const min = (_a = type.min) !== null && _a !== void 0 ? _a : -Infinity;
    const max = (_b = type.max) !== null && _b !== void 0 ? _b : +Infinity;
    if (min > value)
        return false;
    if (max < value)
        return false;
    if (type.step && value % type.step !== 0)
        return false;
    return true;
}
exports.validateNumber = validateNumber;
