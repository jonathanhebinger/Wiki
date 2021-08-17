"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNumber = void 0;
function filterNumber(source, filter) {
    if (typeof source !== 'number')
        return false;
    switch (filter.type) {
        case 'number.equal':
            return source === filter.value;
        case 'number.between':
            return source >= filter.min && source <= filter.max;
        default:
            return false;
    }
}
exports.filterNumber = filterNumber;
