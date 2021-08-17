"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchArray = void 0;
const data_1 = require("./data");
function patchArray(type, source, patch) {
    patch.forEach(patch => {
        switch (patch.type) {
            case 'set':
                source = patch.value;
                break;
            case 'insert':
                if (patch.index === undefined ||
                    patch.index < 0 ||
                    patch.index > source.length) {
                    source.push(patch.value);
                }
                else {
                    source[patch.index] = patch.value;
                }
                break;
            case 'update':
                source[patch.index] = data_1.patchData(type.of, source[patch.index], patch.value);
                break;
            case 'move':
                break;
            case 'delete':
                if ('index' in patch) {
                    source.splice(patch.index, 1);
                }
                if ('value' in patch) {
                    source = source.filter(item => item !== patch.value);
                }
                break;
        }
    });
    return source;
}
exports.patchArray = patchArray;
