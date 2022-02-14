const fs = require('fs/promises');
const path = require('path');
const copyDir = require('../lib/copy-dir');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('copy directory', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('copy a directory', async () => {
    // arrange
    const src = path.join(TEST_DIR, 'src');
    await fs.mkdir(src);
    await fs.writeFile(path.join(src, 'file1.txt'), 'file 1');
    await fs.writeFile(path.join(src, 'file2.txt'), 'file 2');
    await fs.writeFile(path.join(src, 'file3.txt'), 'file 3');
    const dest = path.join(TEST_DIR, 'dest');

    // act 
    await copyDir(src, dest);

    // assert
    const files = await fs.readdir(dest);
    expect(files).toEqual(expect.arrayContaining([
      'file1.txt', 
      'file2.txt', 
      'file3.txt'
    ]));
    
  });


});
