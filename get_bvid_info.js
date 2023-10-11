import request from 'request';
import { writeFile, mkdir } from 'fs';
import { dirname } from 'path';

import { mid, pn, write_json } from './get_up_video_info.js';

import bvids from './get_bvid.js';

// console.log(bvids)

// bvids.forEach(bvid => get_bvid_info(bvid))



function get_bvid_info(bvid){
    var options = {
    'method': 'GET',
    'url': `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,
    'headers': {
    }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        let filePath = `./up/${mid}/bvid/${bvid}.json`
        write_json(filePath, response.body)
    })
}

export { get_bvid_info }
