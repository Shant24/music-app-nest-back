import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

const filesStaticPath = path.resolve(__dirname, '../../..', 'music-static-datas');

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      if (!file) return '';
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${fileExtension}`;
      const filePath = path.resolve(filesStaticPath, type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return `${type}/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string): string {
    try {
      const filePath = path.resolve(filesStaticPath, fileName);
      
      fs.unlinkSync(filePath);
      return fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
