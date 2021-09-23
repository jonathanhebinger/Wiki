"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUtil = void 0;
exports.TypeUtil = {
  Root: {
    reflect(type, data) {
      return new Map(type.entries.map(([key, type]) => {
        return [key, exports.TypeUtil.Any.reflect(new Set(), type, data[key])];
      }));
    },
  },
  Any: {
    reflect(reflect, type, data) {
      switch (type.type) {
        case 'list':
          exports.TypeUtil.Array.reflect(reflect, type, data);
          break;
        case 'object':
          exports.TypeUtil.Object.reflect(reflect, type, data);
          break;
        case 'link':
          exports.TypeUtil.Link.reflect(reflect, type, data);
          break;
      }
      return reflect;
    },
  },
  Array: {
    reflect(reflect, type, data) {
      return data.map(item => {
        return exports.TypeUtil.Any.reflect(reflect, type.of, item);
      });
    },
  },
  Object: {
    reflect(reflect, type, data) {
      return type.entries.map(([key, type]) => {
        return exports.TypeUtil.Any.reflect(reflect, type, data[key]);
      });
    },
  },
  Link: {
    reflect(reflect, type, data) {
      if (!type.reflect)
        return;
      if (data === undefined)
        return;
      reflect.add(data);
    },
  },
};
