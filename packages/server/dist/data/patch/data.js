"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchData = void 0;
const array_1 = require("./array");
const object_1 = require("./object");
function patchData(type, source, patch) {
  switch (type.type) {
    case 'bool':
      return patch;
    case 'number':
      return patch;
    case 'text':
      return patch;
    case 'list':
      return array_1.patchArray(type, source, patch);
    case 'object':
      return object_1.patchObject(type, source, patch);
    case 'link':
      return patch;
  }
}
exports.patchData = patchData;
