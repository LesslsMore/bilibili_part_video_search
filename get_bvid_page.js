import { readFileSync, writeFile, mkdir } from 'fs';
import { dirname } from 'path';

import { mid, pn, write_json } from './get_up_video_info.js';
import { get_bvid_info } from './get_bvid_info.js';

// 各视频播放量
let bvid_play = new Map()

// 2. 从 ./up/${mid}/${p}.json 读取 up 所有视频信息文件，从每分页中获取 bvid 信息
let bvids = read_up_video_info(mid, pn)


// 3. 根据 bvid 调用 api 获取各视频分页信息，并保存文件至 `./up/${mid}/bvid/${bvid}.json`
// 异步，调用完注释

// bvids.forEach(bvid => get_bvid_info(bvid))

// 5. 遍历所有信息将保存到 bvid_page.json 文件

get_bvid_page()

function get_bvid_page() {
  let bvid_page = {}
  bvids.forEach(bvid => {
      let page_info = get_page_info(bvid)
      bvid_page[bvid] = page_info
    } 
  )

  let filePath = `./bvid_page/${mid}.json`
  write_json(filePath, JSON.stringify(bvid_page))
}

// 4. 根据各视频信息提取各分 p url 和名称，保存为 page_info
function get_page_info(bvid){
  let json_path = `./up/${mid}/bvid/${bvid}.json`
  const data = readFileSync(json_path, 'utf8');
  const json = JSON.parse(data);
  // https://www.bilibili.com/video/BV19K4y1L7MT?p=57
  let page_info = []
  json.data.pages.forEach(el => {
      let url = `https://www.bilibili.com/video/${bvid}?p=${el.page}`
      // console.log(url)
      // console.log(el.part)
      let part = el.part
      let play = bvid_play.get(bvid)
      page_info.push({
        url,
        part,
        play
      })
    }
  )
  return page_info
}


function read_up_video_info(mid, pn) {
  let bvids = []
  for (let p = 1; p <= pn; p++){
    let json_path = `./up/${mid}/page/${p}.json`
    const data = readFileSync(json_path, 'utf8');
    const json = JSON.parse(data);
    // console.log(json)
    // https://www.bilibili.com/video/BV19K4y1L7MT?p=57
    json.data.list.vlist.forEach(el => {
          // console.log(el.title)
          // console.log(el.bvid)
          bvids.push(el.bvid)
          bvid_play.set(el.bvid, el.play)
      });
  }
  console.log(bvids.length)
  return bvids
}