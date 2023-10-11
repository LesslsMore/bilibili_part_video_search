// WARNING: For GET requests, body is set to null by browsers.
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://www.imooc.com/api/http/search/suggest?words=js");

xhr.send();

// WARNING: For GET requests, body is set to null by browsers.

var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
xhr.setRequestHeader('X-Custom-Header', 'value');

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.bilibili.com/x/web-interface/view?bvid=BV1mE411h7Co");

xhr.send();
xhr.getResponseHeader('Access-Control-Allow-Origin');

// https://api.bilibili.com/x/web-interface/view?jsonp=jsonp&bvid=BV1mE411h7Co
