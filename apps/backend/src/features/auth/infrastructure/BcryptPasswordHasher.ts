import * as bcrypt from 'bcrypt';
import type { PasswordHasher } from '../application/ports/PasswordHasher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
