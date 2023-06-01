import crypto from 'crypto';

export function generateRandomSalt() {
  const salt = crypto.randomBytes(16).toString('hex');
  return salt;
}
