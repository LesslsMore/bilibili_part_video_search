function getIframeApi(bvid, pid) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("GET", `http://127.0.0.1:8081/process_get?first_name=${bvid}&last_name=${pid}`);
    
    xhr.send();
}

function parseUrl(url) {
    // pattern = `https://www.bilibili.com/video/${}/?p=219`
    let strs = url.split('?');
    // console.log(strs[0]);
    const bvid = strs[0].split('/').pop();
    // console.log(bvid);
    const params = new URLSearchParams(strs[1]);
    // console.log(params);
    const pid = params.get('p');
    console.log("parseUrl: ", bvid, pid);
    return [bvid, pid];
}

// module.exports = getIframeApi;
// module.exports = parseUrl;