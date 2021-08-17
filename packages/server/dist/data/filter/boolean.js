"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBoolean = void 0;
function filterBoolean(source, filter) {
    if (typeof source !== 'boolean')
        return false;
    switch (filter.type) {
        case 'boolean.equal':
            return source === filter.value;
        default:
            return false;
    }
}
exports.filterBoolean = filterBoolean;
