"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.sleep = void 0;
const tslib_1 = require("tslib");
const sleep = (ms) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return yield new Promise((resolve) => setTimeout(resolve, ms)); });
exports.sleep = sleep;
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
exports.random = random;
//# sourceMappingURL=index.js.map