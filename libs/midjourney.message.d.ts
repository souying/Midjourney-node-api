import { LoadingHandler, MJMessage } from "./interfaces";
export declare class MidjourneyMessage {
    ChannelId: string;
    protected SalaiToken: string;
    debug: boolean;
    Limit: number;
    maxWait: number;
    private magApiQueue;
    constructor(ChannelId: string, SalaiToken: string, debug?: boolean, Limit?: number, maxWait?: number);
    protected log(...args: any[]): void;
    FilterMessages(prompt: string, id: string, loading?: LoadingHandler, options?: string, index?: number): Promise<MJMessage | null>;
    UriToHash(uri: string): string;
    WaitMessage(prompt: string, id: string, loading?: LoadingHandler): Promise<MJMessage | undefined>;
    WaitOptionMessage(content: string, id: string, options: string, loading?: LoadingHandler): Promise<MJMessage | undefined>;
    WaitUpscaledMessage(content: string, id: string, index: number, loading?: LoadingHandler): Promise<MJMessage | undefined>;
    protected safeRetrieveMessages(limit?: number): Promise<any>;
    RetrieveMessages(limit?: number): Promise<any>;
}
