"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterData = void 0;
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const link_1 = require("./link");
const number_1 = require("./number");
const object_1 = require("./object");
const string_1 = require("./string");
function filterData(type, source, filter) {
    if (source === undefined)
        return false;
    switch (filter.type) {
        case 'and':
            return filter.filters.every(filter => {
                return filterData(type, source, filter);
            });
        case 'or':
            return filter.filters.some(filter => {
                return filterData(type, source, filter);
            });
        default:
            switch (type.type) {
                case 'boolean':
                    return boolean_1.filterBoolean(source, filter);
                case 'number':
                    return number_1.filterNumber(source, filter);
                case 'string':
                    return string_1.filterString(source, filter);
                case 'array':
                    return array_1.filterArray(type, source, filter);
                case 'object':
                    return object_1.filterObject(type, source, filter);
                case 'link':
                    return link_1.filterLink(source, filter);
            }
    }
}
exports.filterData = filterData;
