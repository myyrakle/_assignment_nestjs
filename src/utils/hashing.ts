import crypto from 'crypto';

export function passwordHashing(password: string): string {
  const hashed = crypto.createHmac('sha256', '').update(password).digest('hex');

  return hashed;
}
