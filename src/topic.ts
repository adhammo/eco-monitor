export declare type OnMessageCallback = (message: Buffer) => void;

export interface Topic {
  name: string;
  callback: OnMessageCallback;
}
