"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidjourneyMessage = void 0;
const tslib_1 = require("tslib");
const queue_1 = require("./queue");
const utls_1 = require("./utls");
// import fetch from "node-fetch"
class MidjourneyMessage {
    constructor(ChannelId, SalaiToken, debug = false, Limit = 50, maxWait = 100) {
        this.ChannelId = ChannelId;
        this.SalaiToken = SalaiToken;
        this.debug = debug;
        this.Limit = Limit;
        this.maxWait = maxWait;
        this.magApiQueue = (0, queue_1.CreateQueue)(1);
        this.log("MidjourneyMessage constructor");
    }
    log(...args) {
        if (this.debug) {
            console.log(...args, new Date().toISOString());
        }
    }
    FilterMessages(prompt, id, loading, options, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // remove urls
            const regex = /(<)?(https?:\/\/[^\s]*)(>)?/gi;
            prompt = prompt.replace(regex, "");
            // remove multiple spaces
            prompt = prompt.trim();
            const data = yield this.safeRetrieveMessages(this.Limit);
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.author.id === "936929561302675456" &&
                    item.content.includes(`${prompt}`)) {
                    this.log(JSON.stringify(item));
                    // Upscaled or Variation
                    if (options &&
                        !(item.content.includes(options) ||
                            (options === "Upscaled" && item.content.includes(`Image #${index}`)))) {
                        this.log("no options");
                        continue;
                    }
                    if (item.attachments.length === 0) {
                        this.log("no attachment");
                        break;
                    }
                    const imageUrl = item.attachments[0].url;
                    //waiting
                    if (item.attachments[0].filename.startsWith("grid") ||
                        item.components.length === 0) {
                        this.log(`content`, item.content);
                        const regex = /\(([^)]+)\)/; // matches the value inside the first parenthesis
                        const match = item.content.match(regex);
                        let progress = "wait";
                        if (match) {
                            progress = match[1];
                        }
                        else {
                            this.log("No match found");
                        }
                        loading === null || loading === void 0 ? void 0 : loading(imageUrl, progress);
                        break;
                    }
                    //finished
                    const content = item.content.split("**")[1];
                    const msg = {
                        code: 1,
                        _id: id,
                        id: item.id,
                        uri: imageUrl,
                        hash: this.UriToHash(imageUrl),
                        content: content,
                        progress: "done",
                    };
                    return msg;
                }
            }
            return null;
        });
    }
    UriToHash(uri) {
        var _a, _b;
        return (_b = (_a = uri.split("_").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]) !== null && _b !== void 0 ? _b : "";
    }
    WaitMessage(prompt, id, loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.maxWait; i++) {
                const msg = yield this.FilterMessages(prompt, id, loading);
                //   console.log("msg",msg)
                if (msg !== null) {
                    return msg;
                }
                this.log(i, "wait no message found");
                yield (0, utls_1.sleep)(1000 * 2);
            }
        });
    }
    WaitOptionMessage(content, id, options, loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.maxWait; i++) {
                const msg = yield this.FilterMessages(content, id, loading, options);
                if (msg !== null) {
                    return msg;
                }
                this.log(i, content, "wait no message found");
                yield (0, utls_1.sleep)(1000 * 2);
            }
        });
    }
    WaitUpscaledMessage(content, id, index, loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.maxWait; i++) {
                const msg = yield this.FilterMessages(content, id, loading, "Upscaled", index);
                if (msg !== null) {
                    return msg;
                }
                this.log(i, content, "wait no message found");
                yield (0, utls_1.sleep)(1000 * 2);
            }
        });
    }
    // limit the number of concurrent interactions
    safeRetrieveMessages(limit = 50) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.magApiQueue.addTask(() => this.RetrieveMessages(limit));
        });
    }
    RetrieveMessages(limit = 50) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const headers = { authorization: this.SalaiToken };
            const controller = new AbortController(); // 新建 AbortController 对象
            const timeout = setTimeout(() => {
                controller.abort();
            }, 10000); // 10s 超时时间
            const response = yield fetch(`https://discord.com/api/v10/channels/${this.ChannelId}/messages?limit=${limit}`, {
                headers: headers,
                signal: controller.signal, // 将 AbortController.signal 作为 signal 选项传给 fetch 方法
            });
            clearTimeout(timeout); // 清除超时定时器
            const data = yield response.json();
            return data;
        });
    }
}
exports.MidjourneyMessage = MidjourneyMessage;
//# sourceMappingURL=midjourney.message.js.map