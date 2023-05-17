import { LoadingHandler } from "./interfaces";
import { MidjourneyMessage } from "./midjourney.message";
export declare class Midjourney extends MidjourneyMessage {
    ServerId: string;
    ChannelId: string;
    protected SalaiToken: string;
    debug: boolean;
    private ApiQueue;
    constructor(ServerId: string, ChannelId: string, SalaiToken: string, debug?: boolean);
    Imagine(prompt: string, id: string, loading?: LoadingHandler): Promise<import("./interfaces").MJMessage | {
        id: string;
        code: number;
        prompt: string;
    }>;
    protected safeIteractions(payload: any): Promise<number>;
    protected interactions(payload: any, callback?: (result: number) => void): Promise<number | undefined>;
    ImagineApi(prompt: string): Promise<number>;
    Variation(content: string, id: string, index: number, msgId: string, msgHash: string, loading?: LoadingHandler): Promise<import("./interfaces").MJMessage | {
        id: string;
        code: number;
        prompt: typeof prompt;
    }>;
    VariationApi(index: number, messageId: string, messageHash: string): Promise<number>;
    Upscale(content: string, id: string, index: number, msgId: string, msgHash: string, loading?: LoadingHandler): Promise<import("./interfaces").MJMessage | {
        id: string;
        code: number;
        prompt: typeof prompt;
    }>;
    UpscaleApi(index: number, messageId: string, messageHash: string): Promise<number>;
    UpscaleByCustomID(messageId: string, customId: string): Promise<number>;
}
