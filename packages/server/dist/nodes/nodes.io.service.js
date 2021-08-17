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
exports.NodeIoService = void 0;
const common_1 = require("@nestjs/common");
const io_gateway_1 = require("../io/io.gateway");
const nodes_service_1 = require("./nodes.service");
let NodeIoService = class NodeIoService {
    constructor(service, io) {
        this.service = service;
        this.io = io;
        this.io.onAction((action, socket) => {
            this.handleAction(action, socket);
        });
        this.io.onQuery((query, socket) => {
            this.handleQuery(query, socket);
        });
    }
    handleQuery(query, socket) {
        switch (query.type) {
            case 'init':
                this.io.emit(socket, {
                    type: 'init',
                    payload: {
                        nodes: this.service.findAll(),
                    },
                });
                break;
        }
    }
    handleAction(action, socket) {
        switch (action.type) {
            case 'create':
                return this.handleActionCreate(action);
            case 'update':
                return this.handleActionUpdate(action);
            case 'delete':
                return this.handleActionDelete(action);
        }
    }
    handleActionCreate(action) {
        const node = this.service.create(action.payload);
        this.io.broadcast({
            type: 'set',
            payload: { node },
        });
    }
    handleActionUpdate(action) {
        const node = this.service.update(action.payload);
        this.io.broadcast({
            type: 'set',
            payload: { node },
        });
    }
    handleActionDelete(action) {
        this.service.delete(action.payload);
        this.io.broadcast({
            type: 'delete',
            payload: action.payload,
        });
    }
};
NodeIoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nodes_service_1.NodesService, io_gateway_1.IoGateway])
], NodeIoService);
exports.NodeIoService = NodeIoService;
