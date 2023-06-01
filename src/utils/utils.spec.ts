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
