declare class ConcurrentQueue {
    private queue;
    private limit;
    constructor(concurrency: number);
    getWaiting(): number;
    addTask<T>(task: () => Promise<T>): Promise<T>;
    getResults(): Promise<any[]>;
}
export declare function CreateQueue<T>(concurrency: number): ConcurrentQueue;
export {};
