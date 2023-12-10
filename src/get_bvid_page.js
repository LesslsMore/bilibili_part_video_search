import { readFileSync, writeFile, mkdir } from 'fs';
import fs from 'fs';
import { dirname } from 'path';

import { mid, pn, write_json } from './get_up_video_info.js';
import { get_bvid_info } from './get_bvid_info.js';
import {generate, parse, transform, stringify} from 'csv/sync';
import { basename, extname } from 'path';

import ExcelJS from 'exceljs';

let ups = [
  {
    'mid': "302417610",
    'pn': 13,
  },
  {
    'mid': "37974444",
    'pn': 16,
  }
]

let bvid_list = []

ups.forEach(up => {
  let bvids = read_up_video_info(up.mid, up.pn)
  bvid_list = bvid_list.concat(bvids)
})


// 2. 从 ./up/${mid}/${p}.json 读取 up 所有视频信息文件，从每分页中获取 bvid 信息
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
          let bvid_path = `./up/${mid}/bvid/${el.bvid}.json`
          bvids.push(bvid_path)
      });
  }
  console.log(`每 mid 下 bvid 数：${bvids.length}`)
  return bvids
}

// 3. 根据 bvid 调用 api 获取各视频分页信息，并保存文件至 `./up/${mid}/bvid/${bvid}.json`
// 异步，调用完注释

// bvids.forEach(bvid => get_bvid_info(bvid))

// get_bvid_page()

// item2csv('up_2')

item2xlsx('up_2')

function get_cols(o) {
  let cols = Object.keys(o).map(k => {
      return {
          "header": k,
          "key": k,
      }
  })
  cols[0].width = 11
  cols[1].width = 10
  cols[2].width = 13
  cols[3].width = 11
  cols[4].width = 50
  cols[5].width = 4
  cols[8].width = 50
  return cols
}

function item2xlsx(file) {
  let file_path = `./data/${file}.xlsx`

  let item_list = []
  bvid_list.forEach(bvid => {
      let items = get_item_info(bvid)
      item_list = item_list.concat(items)
    } 
  )
  item_list.map(item => {
    item.url = {
      text: item.url,
      hyperlink: item.url,
    }
    const date = new Date(item.duration * 1000).toISOString()
    const time = date.substr(11, 8);
    item.duration = time
    return item
  })

  item_list.sort((a, b) => {
    if (a.view !== b.view) {
      return b.view - a.view
    } else {
      return a.page - b.page
    }
  })
  
  const workbook = new ExcelJS.Workbook();
  
  const worksheet = workbook.addWorksheet('up_2');
  
  worksheet.columns = get_cols(item_list[0])

  worksheet.autoFilter = {
    from: {
      row: 1,
      column: 1
    },
    to: {
      row: 1,
      column: 9
    }
  }

  console.log(`写入数据数：${item_list.length}`)
  const newRows = worksheet.addRows(item_list);

  workbook.xlsx.writeFile(file_path)
  .then(() => {
    console.log('File saved successfully!');
  })
  .catch((error) => {
    console.error(error);
  });
}

function item2csv(file) {
  let csv_path = `./data/${file}.csv`

  let item_list = []
  bvid_list.forEach(bvid => {
      let items = get_item_info(bvid)
      item_list = item_list.concat(items)
    } 
  )
  const csvData = stringify(item_list, { header: true });

  fs.writeFile(csv_path, csvData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File saved successfully!');
    }
  });
  
}

// 5. 遍历所有信息将保存到 bvid_page.json 文件
function get_bvid_page() {
  let bvid_page = {}
  bvids.forEach(bvid => {
      let item_info = get_item_info(bvid)
      bvid_page[bvid] = item_info
    } 
  )

  let filePath = `./bvid_page/${mid}.json`
  write_json(filePath, JSON.stringify(bvid_page))
}

// 4. 根据各视频信息提取各分 p url 和名称，保存为 item_info
function get_item_info(bvid_path){
  const data = readFileSync(bvid_path, 'utf8');
  const bvid = basename(bvid_path, extname(bvid_path));
  const json = JSON.parse(data);
  // https://www.bilibili.com/video/BV19K4y1L7MT?p=57
  let item_info = []
  json.data.pages.forEach(el => {
      let url = `https://www.bilibili.com/video/${bvid}?p=${el.page}`
      // console.log(url)
      // console.log(el.part)
      let mid = json.data.owner.mid
      let name = json.data.owner.name
      let view = json.data.stat.view

      let page = el.page
      let cid = el.cid
      let part = el.part
      let duration = el.duration

      item_info.push({
        name,
        mid,
        bvid,
        cid,
        url,
        page,

        view,

        duration,
        part, 
      })
    }
  )
  console.log(`每 bvid 下 cid 数：${item_info.length}`)
  return item_info
}








