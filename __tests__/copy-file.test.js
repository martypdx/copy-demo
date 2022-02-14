const fs = require('fs/promises');
const path = require('path');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('copy file', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('copy a file', async () => {
    // arrange
    const srcPath = path.join(TEST_DIR, 'file.txt');
    const destPath = path.join(TEST_DIR, 'copy.txt');
    await fs.writeFile(srcPath, 'copy me');

    // act 
    await copyFile(srcPath, destPath);

    // assert
    const file = await fs.readFile(destPath);
    expect(file).toEqual('copy me');

  });

});
