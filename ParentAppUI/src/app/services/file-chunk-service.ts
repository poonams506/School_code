import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileChunkService {
  constructor() {}

   chunkFile(file: File, chunkSize: number): Blob[] {
    const chunks: Blob[] = [];
    let offset = 0;

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      chunks.push(chunk);
      offset += chunkSize;
    }

    return chunks;
  }
}
