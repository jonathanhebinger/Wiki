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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let IoGateway = class IoGateway {
    constructor() {
        this.queryListeners = new Set();
        this.actionListeners = new Set();
    }
    handleConnection(socket) {
        console.log('connection');
        this.handleQuery({ type: 'init', payload: {} }, socket);
    }
    handleAction(action, socket) {
        console.log('ACTION:', action);
        this.actionListeners.forEach(listener => listener(action, socket));
    }
    handleQuery(query, socket) {
        console.log('QUERY:', query);
        this.queryListeners.forEach(listener => listener(query, socket));
    }
    emit(socket, event) {
        console.log('EVENT:', event);
        socket.emit('event', event);
    }
    broadcast(event) {
        this.emit(this.server, event);
    }
    onQuery(listener) {
        this.queryListeners.add(listener);
        return () => this.queryListeners.delete(listener);
    }
    onAction(listener) {
        this.actionListeners.add(listener);
        return () => this.actionListeners.delete(listener);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], IoGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('action'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], IoGateway.prototype, "handleAction", null);
__decorate([
    websockets_1.SubscribeMessage('query'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], IoGateway.prototype, "handleQuery", null);
IoGateway = __decorate([
    websockets_1.WebSocketGateway()
], IoGateway);
exports.IoGateway = IoGateway;
