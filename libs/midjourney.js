"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midjourney = void 0;
const tslib_1 = require("tslib");
const midjourney_message_1 = require("./midjourney.message");
const queue_1 = require("./queue");
const utls_1 = require("./utls");
// import fetch from "node-fetch"
class Midjourney extends midjourney_message_1.MidjourneyMessage {
    constructor(ServerId, ChannelId, SalaiToken, debug = false) {
        super(ChannelId, SalaiToken, debug);
        this.ServerId = ServerId;
        this.ChannelId = ChannelId;
        this.SalaiToken = SalaiToken;
        this.debug = debug;
        this.ApiQueue = (0, queue_1.CreateQueue)(1);
    }
    Imagine(prompt, id, loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!prompt.includes("--seed")) {
                const speed = (0, utls_1.random)(1000, 9999);
                prompt = `${prompt} --seed ${speed}`;
            }
            this.log(`Imagine`, prompt);
            const httpStatus = yield this.ImagineApi(prompt);
            if (httpStatus !== 204) {
                throw new Error(`ImagineApi failed with status ${httpStatus}`);
            }
            this.log(`await generate image`);
            const msg = yield this.WaitMessage(prompt, id, loading);
            this.log(`image generated`, prompt, id, msg === null || msg === void 0 ? void 0 : msg.uri);
            // console.log("gujianwen",msg)
            if (msg === undefined) {
                // console.log(123456)
                return {
                    "id": id,
                    "code": 0,
                    "prompt": prompt
                };
            }
            return msg;
        });
    }
    // limit the number of concurrent interactions
    safeIteractions(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.ApiQueue.addTask(() => new Promise((resolve) => {
                this.interactions(payload, (res) => {
                    resolve(res);
                });
            }));
        });
    }
    interactions(payload, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: this.SalaiToken,
                };
                const response = yield fetch("https://discord.com/api/v9/interactions", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: headers,
                    signal: new AbortController().signal,
                });
                setTimeout(() => {
                    const controller = new AbortController();
                    controller.abort();
                }, 10000);
                callback && callback(response.status);
                //discord api rate limit
                yield (0, utls_1.sleep)(950);
                return response.status;
            }
            catch (error) {
                console.log(error);
                callback && callback(500);
            }
        });
    }
    ImagineApi(prompt) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                type: 2,
                application_id: "936929561302675456",
                guild_id: this.ServerId,
                channel_id: this.ChannelId,
                session_id: "2fb980f65e5c9a77c96ca01f2c242cf6",
                data: {
                    version: "1118961510123847772",
                    id: "938956540159881230",
                    name: "imagine",
                    type: 1,
                    options: [
                        {
                            type: 3,
                            name: "prompt",
                            value: prompt,
                        },
                    ],
                    application_command: {
                        id: "938956540159881230",
                        application_id: "936929561302675456",
                        version: "1118961510123847772",
                        default_permission: true,
                        default_member_permissions: null,
                        type: 1,
                        nsfw: false,
                        name: "imagine",
                        description: "Create images with Midjourney",
                        dm_permission: true,
                        options: [
                            {
                                type: 3,
                                name: "prompt",
                                description: "The prompt to imagine",
                                required: true,
                            },
                        ],
                    },
                    attachments: [],
                },
            };
            return this.safeIteractions(payload);
        });
    }
    Variation(content, id, index, msgId, msgHash, loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(content);
            console.log(index);
            console.log(msgId);
            console.log(msgHash);
            // index is 1-4
            if (index < 1 || index > 4) {
                throw new Error(`Variation index must be between 1 and 4, got ${index}`);
            }
            const httpStatus = yield this.VariationApi(index, msgId, msgHash);
            if (httpStatus !== 204) {
                throw new Error(`VariationApi failed with status ${httpStatus}`);
            }
            this.log(`await generate image`);
            // return await this.WaitOptionMessage(content,id, `Variations`, loading);
            let msg = yield this.WaitOptionMessage(content, id, `Variations`, loading);
            if (msg === undefined) {
                // console.log(123456)
                return {
                    "id": id,
                    "code": 0,
                    "prompt": prompt
                };
            }
            return msg;
        });
    }
    VariationApi(index, messageId, messageHash) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                type: 3,
                guild_id: this.ServerId,
                channel_id: this.ChannelId,
                message_flags: 0,
                message_id: messageId,
                application_id: "936929561302675456",
                session_id: "1f3dbdf09efdf93d81a3a6420882c92c",
                data: {
                    component_type: 2,
                    custom_id: `MJ::JOB::variation::${index}::${messageHash}`,
                },
            };
            return this.safeIteractions(payload);
        });
    }
    Upscale(content, id, index, msgId, msgHash, loading) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // index is 1-4
            if (index < 1 || index > 4) {
                throw new Error(`Variation index must be between 1 and 4, got ${index}`);
            }
            const httpStatus = yield this.UpscaleApi(index, msgId, msgHash);
            if (httpStatus !== 204) {
                throw new Error(`VariationApi failed with status ${httpStatus}`);
            }
            this.log(`await generate image`);
            // return await this.WaitUpscaledMessage(content,id, index, loading);
            let msg = yield this.WaitUpscaledMessage(content, id, index, loading);
            if (msg === undefined) {
                // console.log(123456)
                return {
                    "id": id,
                    "code": 0,
                    "prompt": prompt
                };
            }
            return msg;
        });
    }
    UpscaleApi(index, messageId, messageHash) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                type: 3,
                guild_id: this.ServerId,
                channel_id: this.ChannelId,
                message_flags: 0,
                message_id: messageId,
                application_id: "936929561302675456",
                session_id: "ec6524c8d2926e285a8232f7ed1ced98",
                data: {
                    component_type: 2,
                    custom_id: `MJ::JOB::upsample::${index}::${messageHash}`,
                },
            };
            return this.safeIteractions(payload);
        });
    }
    UpscaleByCustomID(messageId, customId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                type: 3,
                guild_id: this.ServerId,
                channel_id: this.ChannelId,
                message_flags: 0,
                message_id: messageId,
                application_id: "936929561302675456",
                session_id: "ec6524c8d2926e285a8232f7ed1ced98",
                data: {
                    component_type: 2,
                    custom_id: customId,
                },
            };
            return this.safeIteractions(payload);
        });
    }
}
exports.Midjourney = Midjourney;
//# sourceMappingURL=midjourney.js.map