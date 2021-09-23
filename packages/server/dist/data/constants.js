"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_NOTE = exports.TYPE_FOLDER = exports.TYPE_TYPE = exports.TYPE_NODE = void 0;
exports.TYPE_NODE = {
  type: 'object',
  required: true,
  entries: [
    ['type', { type: 'link', required: true, reflect: true, with: 'type' }],
    ['data', { type: 'link', required: true, reflect: true, with: '$type' }],
  ],
};
exports.TYPE_TYPE = {
  type: 'object',
  required: true,
  entries: [
    ['name', { type: 'text', required: true }],
    ['type', { type: 'type', name: '$name' }],
  ],
};
exports.TYPE_FOLDER = {
  type: 'object',
  required: true,
  entries: [
    ['name', { type: 'text', required: false }],
    [
      'nodes',
      {
        type: 'list',
        required: false,
        of: { type: 'link', required: true, reflect: true, with: 'node' },
      },
    ],
  ],
};
exports.TYPE_NOTE = {
  type: 'object',
  required: true,
  entries: [
    ['title', { type: 'text', required: false }],
    ['note', { type: 'text', required: true }],
  ],
};
