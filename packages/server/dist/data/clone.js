"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
function clone(value) {
    if (Array.isArray(value)) {
        return value.map(value => clone(value));
    }
    else if (typeof value === 'object') {
        return Object.fromEntries(Object.entries(([key, value]) => {
            return [key, clone(value)];
        }));
    }
    return value;
}
exports.clone = clone;
