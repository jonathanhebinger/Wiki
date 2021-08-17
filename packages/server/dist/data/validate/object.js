"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObject = void 0;
const object_1 = require("../is/object");
const data_1 = require("./data");
function validateObject(nodes, type, value) {
    if (!object_1.dataIsObject(value))
        return false;
    return type.entries.every(([key, type]) => {
        return data_1.validateData(nodes, type, Reflect.get(value, key));
    });
}
exports.validateObject = validateObject;
