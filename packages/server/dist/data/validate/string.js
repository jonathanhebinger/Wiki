"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateString = void 0;
function validateString(type, value) {
    var _a, _b;
    if (typeof value !== 'string')
        return false;
    const minLength = (_a = type.minLength) !== null && _a !== void 0 ? _a : 0;
    const maxLength = (_b = type.maxLength) !== null && _b !== void 0 ? _b : Infinity;
    if (minLength > value.length)
        return false;
    if (maxLength < value.length)
        return false;
    if (type.pattern) {
        const patterns = Array.isArray(type.pattern) ? type.pattern : [type.pattern];
        const match = patterns.some(pattern => {
            return new RegExp(pattern).test(value);
        });
        if (!match)
            return false;
    }
    return true;
}
exports.validateString = validateString;
