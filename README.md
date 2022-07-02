# Svelte

This directory is a brief example of a [Svelte](https://svelte.dev/) site that can be deployed to Vercel with zero-configuration. If you need to use API Routes, we recommend using our [SvelteKit example](https://github.com/vercel/vercel/tree/main/examples/sveltekit).

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/svelte&template=svelte)

_Live Example: https://svelte.vercel.app_

## Getting Started

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

```
const { MongoClient } = require("mongodb");
async function main() {
  try {
    await client.connect();
    const log = await client.db('testsdb')
      .collection('expenses')
      .drop();
    console.log(log);
  } catch (err) {
    console.warn(err);
  } finally {
    await client.close();
  }
}


const client = new MongoClient(
  'mongodb://admin:k9GH2mEBCs5YrCAY@cluster0-shard-00-00.hhfo3.mongodb.net:27017,cluster0-shard-00-01.hhfo3.mongodb.net:27017,cluster0-shard-00-02.hhfo3.mongodb.net:27017/?ssl=true&replicaSet=atlas-mo11vt-shard-0&authSource=admin&retryWrites=true&w=majority'
);

main();
```