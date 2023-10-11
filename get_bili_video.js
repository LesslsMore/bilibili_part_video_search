// https://api.bilibili.com/x/player/pagelist?bvid=BV1mE411h7Co

function get_bili_video(bvid, pid) {
        //使用了 https://blog.xxwhite.com/2020/03230.bilibili-bvid.html 提供的api
        //作者 叉叉白 at https://blog.xxwhite.com/
        const axios = require('axios');
        // const req = axios.get('https://api.bilibili.com/x/player/pagelist?bvid=' + bvid);
        const req = axios.get('https://api.bilibili.com/x/web-interface/view?bvid=' + bvid);
        return req.then((res) =>
        {
            // console.log(res)
            const rq_ = res.data;
            if (res.status !== 200)
            {
                throw new Error(bvid+"-API服务出现异常，请检查网络情况重试或联系作者");
            }
            if (rq_.code !== 0)
            {
                throw new Error(bvid+"-无效的视频bv号，请重新确认");
            }
            // console.log(rq_);
            let data = rq_.data;
            // console.log(data);
            let aid = data.aid;
            // console.log(aid);
            let pages = data.pages;
            let page = pages[pid - 1];
            let cid = page.cid;
            // console.log(cid);
            let iframe = `<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe src="https://player.bilibili.com/player.html?aid=${aid}&bvid=${bvid}&cid=${cid}&page=${pid}" scrolling="no" border="0" frameborder="no"
  framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>`
            console.log(iframe);
            return iframe;
        });
}



// let [bvid, pid] = parseUrl('https://www.bilibili.com/video/BV1mE411h7Co?p=218');
// // console.log(bvid, pid);
// let iframe = getIframe(bvid, pid);
// console.log(iframe);

// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
  
//   fetch("https://api.bilibili.com/x/web-interface/view?bvid=BV1mE411h7Co", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));



module.exports = getIframe;