"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchObject = void 0;
const data_1 = require("./data");
function patchObject(type, source, patch) {
    type.entries.forEach(([key, type]) => {
        if (!(key in patch))
            return;
        source[key] = data_1.patchData(type, source[key], patch[key]);
    });
    return source;
}
exports.patchObject = patchObject;
