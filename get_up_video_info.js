import request from 'request';
import { readFileSync, writeFile, mkdir } from 'fs';
import { dirname } from 'path';

// let mid = '302417610'
// let pn = 13

let mid = '37974444'
let pn = 16



// 1. 获取 up 所有投稿视频信息保存为 ./up/${mid}/${p}.json 按分页保存
// 用完注释函数，否定被其他文件调用参数时会运行，
// 参数配置化 json yaml 文件

// get_up_video_info(mid, pn)

function get_up_video_info(mid, pn){
    for (let p = 1; p <= pn; p++){
    
        var options = {
        'method': 'GET',
        'url': `https://api.bilibili.com/x/space/wbi/arc/search?mid=${mid}&ps=30&tid=0&pn=${p}&keyword=&order=pubdate&platform=web&web_location=1550101&order_avoided=true&w_rid=e5b83cf360969a399c83deb8cdb950f6&wts=1697024795`,
        'headers': {
            'authority': 'api.bilibili.com',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
            'cookie': 'buvid3=E7B608C4-2607-2805-A7FD-5F95433B189B95297infoc; b_nut=1678886695; _uuid=D41488E4-C964-123C-EF68-CC588C291066588075infoc; DedeUserID=4608012; DedeUserID__ckMd5=2fa848b2c0514372; buvid4=B1868396-F80D-A710-C591-3D54FD85D84597291-023031521-ADgaJkpv35Zj%2BH4loF2sLg%3D%3D; buvid_fp_plain=undefined; rpdid=|(J|)RYlll)m0J\'uY~)))Y~km; nostalgia_conf=-1; CURRENT_PID=b7304440-cd68-11ed-9c5e-2bd24ba66c55; i-wanna-go-back=-1; b_ut=5; header_theme_version=CLOSE; FEED_LIVE_VERSION=V8; LIVE_BUVID=AUTO2916815669584155; hit-dyn-v2=1; share_source_origin=COPY; bp_t_offset_4608012=795146086246252700; hit-new-style-dyn=1; dy_spec_agreed=1; CURRENT_BLACKGAP=0; is-2022-channel=1; CURRENT_FNVAL=4048; CURRENT_QUALITY=64; bsource=search_google; fingerprint=d6ec10a5574ba24ede08778f1951defa; buvid_fp=d6ec10a5574ba24ede08778f1951defa; PVID=1; SESSDATA=af254ec1%2C1712408142%2C69441%2Aa1CjAVHZSdgeBiOB_tI4ejaPki59Ap_lU3qrMN0HTs4wcS6ghmxPdIhXCFHAebpO10QFUSVkF4U0s2MDBUVVNXTzBkOWVQVmw0MmdhcmtRVmVNQ0hGREVWdWxrTTFSZXFid3BYS1BJV1dMamxqMVFfTVpSRFFjZXNOX090UU94MG1qOHVHVGVuR1NRIIEC; bili_jct=d0ba8044386764b114a7cf13c6ace86d; sid=6nldwc0l; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcxMjA3MDksImlhdCI6MTY5Njg2MTQ0OSwicGx0IjotMX0.o9KdbMsCKfV-qBkJe0YWZty6cNyw19itdHjKnqgye9c; bili_ticket_expires=1697120649; home_feed_column=5; browser_resolution=1536-707; b_lsid=96CDD4EF_18B1E501DA6; bp_video_offset_4608012=851187257362612241',
            'origin': 'https://space.bilibili.com',
            'referer': 'https://space.bilibili.com/302417610/video?tid=0&pn=8&keyword=&order=pubdate',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let filePath = `./up/${mid}/page/${p}.json`
            let data = response.body
            write_json(filePath, data)
        });
    }
}


function write_json(filePath, data) {
    mkdir(dirname(filePath), { recursive: true }, (err) => {
        writeFile(filePath, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
}

export { mid, pn, write_json };