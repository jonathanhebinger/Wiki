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
exports.NotesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const create_note_dto_1 = require("./dto/create-note.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
const nodes_service_1 = require("./nodes.service");
let NotesGateway = class NotesGateway {
    constructor(notesService) {
        this.notesService = notesService;
    }
    create(createNoteDto) {
        return this.notesService.create(createNoteDto);
    }
    findAll() {
        return this.notesService.findAll();
    }
    findOne(id) {
        return this.notesService.findOne(id);
    }
    update(updateNoteDto) {
        return this.notesService.update(updateNoteDto.id, updateNoteDto);
    }
    remove(id) {
        return this.notesService.remove(id);
    }
};
__decorate([
    websockets_1.SubscribeMessage('createNote'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", void 0)
], NotesGateway.prototype, "create", null);
__decorate([
    websockets_1.SubscribeMessage('findAllNotes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotesGateway.prototype, "findAll", null);
__decorate([
    websockets_1.SubscribeMessage('findOneNote'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotesGateway.prototype, "findOne", null);
__decorate([
    websockets_1.SubscribeMessage('updateNote'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", void 0)
], NotesGateway.prototype, "update", null);
__decorate([
    websockets_1.SubscribeMessage('removeNote'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotesGateway.prototype, "remove", null);
NotesGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [nodes_service_1.NotesService])
], NotesGateway);
exports.NotesGateway = NotesGateway;
