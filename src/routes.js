import Main from './routes/Main.svelte';
import Add from './routes/Add.svelte';
import Lorem from './routes/Lorem.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
    '/': Main,
    '/add': Add,
    '/lorem/:repeat': Lorem,
    // The catch-all route must always be last
    '*': NotFound
};
