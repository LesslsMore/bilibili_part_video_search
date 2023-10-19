import { Client } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' });

async function run () {
  await client.index({
    index: 'myindex',
    body: {
      title: 'Test',
      tags: ['y', 'z'],
      published: true,
      published_at: new Date().toISOString()
    }
  });
}

run().then(() => console.log('Data inserted successfully.')).catch(console.log);


