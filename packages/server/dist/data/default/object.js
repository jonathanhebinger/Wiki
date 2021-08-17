"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultObject = void 0;
const data_1 = require("./data");
function defaultObject(type) {
    return Object.fromEntries(type.entries.map(([key, type]) => {
        return [key, data_1.defaultData(type)];
    }));
}
exports.defaultObject = defaultObject;
