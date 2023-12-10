const seconds = 215;
const date = new Date(seconds * 1000).toISOString()
const time = date.substr(14, 5);
console.log(date);
console.log(time);