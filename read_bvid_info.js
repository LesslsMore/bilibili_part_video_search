import { readFileSync, writeFile } from 'fs';
import bvids from './get_bvid.js';

bvids.forEach(bvid => readJson(bvid))

function readJson(bvid) {
  let json_path = `./json-/${bvid}.json`
  const data = readFileSync(json_path, 'utf8');
  const json = JSON.parse(data);
  // https://www.bilibili.com/video/BV19K4y1L7MT?p=57
  json.data.pages.forEach(el => {
      let url = `https://www.bilibili.com/video/${bvid}?p=${el.page}`
      console.log(url)
      console.log(el.part)
    }
  )
}