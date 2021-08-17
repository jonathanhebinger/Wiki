"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultData = void 0;
const object_1 = require("./object");
function defaultData(type) {
    switch (type.type) {
        case 'boolean':
            return type.default;
        case 'number':
            return type.default;
        case 'string':
            return type.default;
        case 'array':
            return type.default || [];
        case 'object':
            return object_1.defaultObject(type);
        case 'link':
            return type.default;
        default:
            return false;
    }
}
exports.defaultData = defaultData;
