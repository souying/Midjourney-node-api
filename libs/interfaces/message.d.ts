export interface Message {
    text: string;
    img: string;
}
export interface MJMessage {
    code: number;
    _id: string;
    id: string;
    uri: string;
    hash: string;
    content: string;
    progress?: string;
}
export type LoadingHandler = (uri: string, progress: string) => void;
