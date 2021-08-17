"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoMap = void 0;
class AutoMap extends Map {
    constructor(builder) {
        super();
        this.builder = builder;
    }
    get(key) {
        let item = super.get(key);
        if (!item) {
            item = this.builder(key);
            this.set(key, item);
        }
        return item;
    }
}
exports.AutoMap = AutoMap;
