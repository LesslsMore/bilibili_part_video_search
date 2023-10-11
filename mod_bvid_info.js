import { readFileSync, writeFile } from 'fs';
import bvids from './get_bvid.js';

bvids.forEach(bvid => readJson(bvid))

function readJson(bvid) {
  let json_path = `./json/${bvid}.json`
  const data = readFileSync(json_path, 'utf8');
  const json = JSON.parse(data);
  console.log(json)
  writeFile(`${bvid}.json`, json, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}