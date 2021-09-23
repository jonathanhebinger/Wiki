"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLink = void 0;
function validateLink(nodes, type, value) {
  if (typeof value !== 'text')
    return false;
  const linked = nodes[value];
  if (!linked)
    return false;
  return true;
}
exports.validateLink = validateLink;
