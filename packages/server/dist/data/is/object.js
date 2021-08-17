"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataIsObject = void 0;
function dataIsObject(value) {
    return !Array.isArray(value) && typeof value === 'object' && value !== null;
}
exports.dataIsObject = dataIsObject;
