"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQueue = void 0;
const tslib_1 = require("tslib");
const p_queue_1 = tslib_1.__importDefault(require("p-queue"));
class ConcurrentQueue {
    constructor(concurrency) {
        this.queue = [];
        this.limit = new p_queue_1.default({ concurrency });
    }
    getWaiting() {
        return this.queue.length;
    }
    addTask(task) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.limit.add(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const result = yield task();
                return result;
            }));
        });
    }
    getResults() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Promise.allSettled(this.queue.map((task) => {
                return task().catch((err) => err);
            }));
        });
    }
}
function CreateQueue(concurrency) {
    return new ConcurrentQueue(5);
}
exports.CreateQueue = CreateQueue;
// // Usage example:
// const queue = new ConcurrentQueue(5);
// for (let i = 0; i < 10; i++) {
//   queue.addTask(() =>
//     new Promise<number>((resolve, reject) => {
//       setTimeout(() => {
//         console.log('Task done:', i);
//         resolve(i * 2);
//       }, Math.random() * 1000);
//     })
//   );
// }
// console.log('Tasks waiting:', queue.getWaiting());
// setTimeout(() => {
//   queue.getResults().then((results) => {
//     console.log('Results:', results);
//   });
// }, 5000);
//# sourceMappingURL=queue.js.map