"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeArray = void 0;
const object_1 = require("../is/object");
const object_2 = require("./object");
function mergeArray(...items) {
    return items.reduce((acc, item) => {
        if (!item)
            return acc;
        Object.entries(item).forEach(([key, value]) => {
            if (value === undefined) {
                delete acc[key];
            }
            else if (Array.isArray(value)) {
                acc[key] = [...value];
            }
            else if (object_1.dataIsObject(value)) {
                acc[key] = object_2.mergeObject(acc[key], value);
            }
            else {
                acc[key] = value;
            }
        });
        return acc;
    }, {});
}
exports.mergeArray = mergeArray;
