"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoService = void 0;
const common_1 = require("@nestjs/common");
let IoService = class IoService {
    constructor() {
        this.queryListeners = new Set();
        this.actionListeners = new Set();
    }
    handleQuery(query, socket) {
        this.queryListeners.forEach(listener => listener(query, socket));
    }
    handleAction(action, socket) {
        this.actionListeners.forEach(listener => listener(action, socket));
    }
    onQuery(listener) {
        this.queryListeners.add(listener);
        return () => this.queryListeners.delete(listener);
    }
    onAction(listener) {
        this.actionListeners.add(listener);
        return () => this.actionListeners.delete(listener);
    }
    emit(socket, event) {
        socket.emit('event', event);
    }
    broadcast(event) {
        this.emit(this.server, event);
    }
};
IoService = __decorate([
    common_1.Injectable()
], IoService);
exports.IoService = IoService;
