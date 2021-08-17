"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesModule = void 0;
const common_1 = require("@nestjs/common");
const io_module_1 = require("../io/io.module");
const nodes_action_service_1 = require("./nodes.action.service");
const nodes_query_service_1 = require("./nodes.query.service");
const nodes_service_1 = require("./nodes.service");
let NodesModule = class NodesModule {
};
NodesModule = __decorate([
    common_1.Module({
        imports: [io_module_1.IoModule],
        providers: [nodes_service_1.NodesService, nodes_action_service_1.NodeActionService, nodes_query_service_1.NodeQueryService],
        exports: [],
    })
], NodesModule);
exports.NodesModule = NodesModule;
