"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const automap_1 = require("../utils/automap");
let NodesService = class NodesService {
    constructor() {
        this.datas = new automap_1.AutoMap(() => new Map());
        this.nodes = new Map();
        this.types = new Map();
        this.datas.set('node', this.nodes);
        this.datas.set('type', this.types);
        const folderA = this.create({
            name: 'Folder A',
            tags: [],
        });
        const folderB = this.create({
            name: 'Folder B',
            tags: [],
        });
        const folderC = this.create({
            name: 'Folder C',
            tags: [],
        });
        this.create({
            name: 'Node A',
            tags: [folderA.id, folderB.id],
        });
        this.create({
            name: 'Node B',
            tags: [folderB.id, folderC.id],
        });
    }
    create({ name, tags }) {
        const id = uuid_1.v4();
        const creation = Date.now();
        const modification = creation;
        const node = {
            id,
            name,
            tags,
            content: '',
            data: [],
            creation,
            modification,
        };
        this.nodes.set(id, node);
        return node;
    }
    findAll() {
        return [...this.nodes.values()];
    }
    findOne(node) {
        return this.nodes.get(node);
    }
    rename({ id, name }) {
        return this.patch(id, node => {
            node.name = name;
        });
    }
    update({ id, content }) {
        return this.patch(id, node => {
            node.content = content;
        });
    }
    tagAdd({ node, tag }) {
        return this.patch(node, node => {
            node.tags.push(tag);
        });
    }
    tagMove({ node, tag, index }) {
        return this.patch(node, node => {
            const position = node.tags.indexOf(tag);
            if (position < index) {
                node.tags.splice(index, 0, tag);
                node.tags.splice(position, 1);
            }
            else {
                node.tags.splice(position, 1);
                node.tags.splice(index, 0, tag);
            }
        });
    }
    tagRemove({ node, tag }) {
        return this.patch(node, node => {
            node.tags = node.tags.filter(item => item != tag);
        });
    }
    delete(id) {
        if (this.isTagged(id))
            throw new Error();
        return this.nodes.delete(id);
    }
    patch(id, patcher) {
        const node = this.nodes.get(id);
        if (!node)
            throw new Error();
        patcher(node);
        return node;
    }
    isTagged(id) {
        return [...this.nodes.values()].some(node => node.tags.includes(id));
    }
};
NodesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], NodesService);
exports.NodesService = NodesService;
