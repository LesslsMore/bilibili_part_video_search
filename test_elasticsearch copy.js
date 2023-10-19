import { Client } from '@elastic/elasticsearch';
import fs from 'fs'
import path from 'path'
const client = new Client({ node: 'http://localhost:9200' });

client.ping()
  .then(res => console.log('connection success', res))
  .catch(err => console.error('wrong connection', err));
 
const INDEX_NAME = "bvid_page";

let directoryPath = 'bvid_page'

const files = fs.readdirSync(directoryPath);
for (const file of files) {
  const filePath = path.join(directoryPath, file);
  if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.json') {
    const data = JSON.parse(fs.readFileSync(filePath));
    // searchObjectByKeyValue(data, 'part', 'postc')
    // function searchObjectByKeyValue(obj, key, value) {
    //   return obj.find((o) => o[key] === value);
    // }
    
    // await client.index({
    //   index: INDEX_NAME,
    //   document: data
    // })
  }
  console.log(filePath)
}


async function run () {
  // Let's start by indexing some data
  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: INDEX_NAME })
 
  // Let's search!
  const result= await client.search({
    index: INDEX_NAME,
    query: {
      match: { part : 'postc' }
    }
  })
 
  console.log(result.hits.hits)
}
 
// run().catch(console.log)


