"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultData = void 0;
const object_1 = require("./object");
function defaultData(type) {
  switch (type.type) {
    case 'bool':
      return type.default;
    case 'number':
      return type.default;
    case 'text':
      return type.default;
    case 'list':
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
