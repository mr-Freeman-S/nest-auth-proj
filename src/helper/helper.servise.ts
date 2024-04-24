import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelperService {
  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 16);
  }

  async compareHashData(
    firstValue: string,
    secondHashValue: string,
  ): Promise<boolean> {
    return bcrypt.compare(firstValue, secondHashValue);
  }

  generateCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }
}
