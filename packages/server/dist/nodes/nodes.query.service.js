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
exports.NodeQueryService = void 0;
const common_1 = require("@nestjs/common");
const io_gateway_1 = require("../io/io.gateway");
const nodes_service_1 = require("./nodes.service");
let NodeQueryService = class NodeQueryService {
    constructor(service, io) {
        this.service = service;
        this.io = io;
        this.io.onQuery((query, socket) => {
            this.handleQuery(query, socket);
        });
    }
    handleQuery(query, socket) {
        switch (query.type) {
            case 'init':
                return this.handleInit(socket);
        }
    }
    handleInit(socket) {
        this.io.emit(socket, {
            type: 'init',
            payload: {
                nodes: this.service.findAll(),
            },
        });
    }
};
NodeQueryService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nodes_service_1.NodesService, io_gateway_1.IoGateway])
], NodeQueryService);
exports.NodeQueryService = NodeQueryService;
