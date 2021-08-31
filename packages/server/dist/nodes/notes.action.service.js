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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeActionService = void 0;
const common_1 = require("@nestjs/common");
const io_gateway_1 = require("../io/io.gateway");
const nodes_service_1 = require("./nodes.service");
let NodeActionService = class NodeActionService {
  constructor(service, io) {
    this.service = service;
    this.io = io;
    this.io.onAction((action, socket) => {
      this.handleAction(action, socket);
    });
  }
  handleAction(action, socket) {
    switch (action.type) {
      case 'create':
        return this.handleActionCreate(action.payload, socket);
      case 'rename':
        return this.handleActionRename(action.payload);
      case 'update':
        return this.handleActionUpdate(action.payload);
      case 'delete':
        return this.handleActionDelete(action.payload);
      case 'tag.create':
        return this.handleActionTagCreate(action.payload, socket);
      case 'tag.add':
        return this.handleActionTagAdd(action.payload);
      case 'tag.move':
        return this.handleActionTagMove(action.payload);
      case 'tag.remove':
        return this.handleActionTagRemove(action.payload);
    }
  }
  handleActionCreate(payload, socket) {
    const node = this.service.create(payload);
    this.io.broadcast({
      type: 'set',
      payload: [node],
    });
    this.io.emit(socket, {
      type: 'open',
      payload: NodeId,
    });
    return node;
  }
  handleActionRename(payload) {
    const node = this.service.rename(payload);
    this.io.broadcast({
      type: 'set',
      payload: [node],
    });
  }
  handleActionUpdate(payload) {
    const node = this.service.update(payload);
    this.io.broadcast({
      type: 'set',
      payload: [node],
    });
  }
  handleActionDelete(payload) {
    this.service.delete(payload);
    this.io.broadcast({
      type: 'delete',
      payload: payload,
    });
  }
  handleActionTagCreate({ node, name }, socket) {
    const tag = this.handleActionCreate({ name, tags: [] }, socket);
    this.handleActionTagAdd({ node, tag: tag.id });
  }
  handleActionTagAdd(payload) {
    const node = this.service.tagAdd(payload);
    this.io.broadcast({
      type: 'set',
      payload: [node],
    });
  }
  handleActionTagMove(payload) {
    const node = this.service.tagMove(payload);
    this.io.broadcast({
      type: 'set',
      payload: [node],
    });
  }
  handleActionTagRemove(payload) {
    const node = this.service.tagRemove(payload);
    this.io.broadcast({
      type: 'set',
      payload: [node],
    });
  }
};
NodeActionService = __decorate([
  common_1.Injectable(),
  __metadata("design:paramtypes", [typeof (_a = typeof nodes_service_1.NodesService !== "undefined" && nodes_service_1.NodesService) === "function" ? _a : Object, io_gateway_1.IoGateway])
], NodeActionService);
exports.NodeActionService = NodeActionService;
