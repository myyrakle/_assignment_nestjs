import { passwordHashing } from './hashing';
import { generateRandomSalt } from './salt';

describe('random', () => {
  it('random test', () => {
    const salt = generateRandomSalt();
    expect(salt).toBeDefined();

    expect(salt.length).toBe(32);

    const otherSalt = generateRandomSalt();
    expect(salt).not.toBe(otherSalt);
  });
});

describe('hashing', () => {
  it('hashing test', () => {
    const originalPassword = 'q1w2e3r4';
    const salt = generateRandomSalt();

    const hashedPassword = passwordHashing(originalPassword + salt);

    expect(originalPassword).not.toBe(hashedPassword);

    const otherSalt = generateRandomSalt();
    const otherHashedPassword = passwordHashing(originalPassword + otherSalt);
    expect(hashedPassword).not.toBe(otherHashedPassword);
  });
});
