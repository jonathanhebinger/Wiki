"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const link_1 = require("./link");
const number_1 = require("./number");
const object_1 = require("./object");
const string_1 = require("./string");
function validateData(nodes, type, value) {
  if (value === undefined)
    return !('required' in type) || !type.required;
  switch (type.type) {
    case 'bool':
      return boolean_1.validateBoolean(type, value);
    case 'number':
      return number_1.validateNumber(type, value);
    case 'text':
      return string_1.validateString(type, value);
    case 'list':
      return array_1.validateArray(nodes, type, value);
    case 'object':
      return object_1.validateObject(nodes, type, value);
    case 'link':
      return link_1.validateLink(nodes, type, value);
    default:
      return false;
  }
}
exports.validateData = validateData;
