"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_note_dto_1 = require("./create-note.dto");
class UpdateNoteDto extends mapped_types_1.PartialType(create_note_dto_1.CreateNoteDto) {
}
exports.UpdateNoteDto = UpdateNoteDto;
