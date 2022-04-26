import { stdin, stdout, nextTick } from 'process';
import { Writable, pipeline } from 'stream';

function streamStringReverse(chunks, cb) {
  const size = chunks[0].chunk.length - 2;
  const result = []
  for(let i = size; i >= 0; i--){
    result.push(chunks[0].chunk[i]);
  }
  result.push(0x0a, 0x0a);
  if (stdout.write(new Uint8Array(result))) {
    nextTick(cb);
  } else {
    stdout.once('drain', cb);
  }
}

const writable = Writable({writev: streamStringReverse})

pipeline(
  stdin,
  writable,
  (err) => console.log('pipeline error: ', err)
);