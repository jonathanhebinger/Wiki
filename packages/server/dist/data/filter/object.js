"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObject = void 0;
const object_1 = require("../is/object");
const data_1 = require("./data");
function filterObject(type, source, filter) {
    if (!object_1.dataIsObject(source))
        return false;
    switch (filter.type) {
        case 'object.equal':
            return source === filter.value;
        case 'object.match':
            return Object.entries(filter.value).every(([key, filter]) => {
                const entry = type.entries.find(([typeKey, type]) => {
                    return typeKey === key;
                });
                if (!entry)
                    return false;
                return data_1.filterData(entry[1], source[key], filter);
            });
        default:
            return false;
    }
}
exports.filterObject = filterObject;
