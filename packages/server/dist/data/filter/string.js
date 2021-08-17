"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterString = void 0;
function filterString(source, filter) {
    var _a;
    if (typeof source !== 'string')
        return false;
    switch (filter.type) {
        case 'string.equal':
            return source === filter.value;
        case 'string.match':
            return (((_a = source.match(filter.pattern)) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0;
        default:
            return false;
    }
}
exports.filterString = filterString;
