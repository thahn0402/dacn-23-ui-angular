import { SafeUrl } from "@angular/platform-browser";

export interface FileHandle{
    // name: string;
    // picByte(picByte: any, type: (picBytes: any, type: any) => unknown): unknown;
    // picBytes(picBytes: any, type: (picBytes: any, type: any) => unknown): unknown;
    // type(picBytes: any, type: any): unknown;
    file: File,
    url: SafeUrl
}