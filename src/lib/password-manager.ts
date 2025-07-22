import { hash, compare } from 'bcrypt';
export class passwordManager {
  private readonly SALTS = 6;

  async encrypt(password: string) {
    const encryptedPassword = await hash(password, this.SALTS);
    return encryptedPassword;
  }

  async compare(rawPassword: string, encryptedPassword: string) {
    const result = await compare(rawPassword, encryptedPassword);
    return result;
  }
}
