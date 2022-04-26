import { createReadStream, createWriteStream, promises } from 'fs';
import { Writable, pipeline } from 'stream';
import { nextTick } from 'process';
import csv from 'csvtojson';

const CSV_FILE = './file.csv';
const RESULT_FILE = './resultText.txt';

class MyWritable extends Writable {

  constructor(options) {
    super(options);

    this.empty = true;
    this.writeStream = null;
  }

  _write(chunk, enc, cb) {
    if (!chunk.length) {
      return;
    }
    console.log('chunk: ', chunk.toString());
    (async () => {
      if (!this.writeStream) {
        await this.removeFile(RESULT_FILE);
        this.writeStream = createWriteStream(RESULT_FILE, { flag: 'a' });
      }
      if (this.writeStream.write(chunk, enc)) {
        nextTick(cb);
      } else {
        this.writeStream.once('drain', cb);
      }
    })();
  }

  _final(cb) {
    this.writeStream.end(cb);
  }

  async removeFile(path) {
    try {
      return promises.rm(path, { force: true });
    } catch (err) {
      throw new Error(`rm error: ${err.message}`);
    }
  }
}

const readStream = createReadStream(CSV_FILE, 'utf8');
const myWritable = new MyWritable()

const myPipeline = pipeline(
  readStream,
  csv({
    delimiter: ';',
    ignoreEmpty: true,
    checkType: true
  }),
  myWritable,
  (err) => err && console.log('pipeline error: ', err),
);
myPipeline.on('finish', () => console.log('finish'));