"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLink = void 0;
function filterLink(source, filter) {
  if (typeof source !== 'text')
    return false;
  switch (filter.type) {
    case 'link.equal':
      return source === filter.value;
    default:
      return false;
  }
}
exports.filterLink = filterLink;
