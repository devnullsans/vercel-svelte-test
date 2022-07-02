import Main from './routes/Main.svelte';
import Add from './routes/Add.svelte';
import Edit from './routes/Edit.svelte';
import Info from './routes/Info.svelte';
import Lorem from './routes/Lorem.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
    '/': Main,
    '/add': Add,
    '/info/:id': Info,
    '/edit/:id': Edit,
    '/lorem/:repeat': Lorem,
    // The catch-all route must always be last
    '*': NotFound
};
