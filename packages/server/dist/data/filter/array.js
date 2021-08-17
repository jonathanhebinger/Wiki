"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterArray = void 0;
const data_1 = require("./data");
function filterArray(type, source, filter) {
    if (!Array.isArray(source))
        return false;
    switch (filter.type) {
        case 'array.equal':
            return source === filter.value;
        case 'array.includes':
            return source.some(item => item === filter.value);
        case 'array.none':
            return source.every(item => {
                return !data_1.filterData(type.of, item, filter.filter);
            });
        case 'array.some':
            return source.some(item => {
                return data_1.filterData(type.of, item, filter.filter);
            });
        case 'array.every':
            return source.every(item => {
                return data_1.filterData(type.of, item, filter.filter);
            });
        default:
            return false;
    }
}
exports.filterArray = filterArray;
