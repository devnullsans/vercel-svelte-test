import Main from './routes/Main.svelte';
import Add from './routes/Add.svelte';
import Edit from './routes/Edit.svelte';
import Info from './routes/Info.svelte';
import Login from './routes/Login.svelte';
import NotFound from './routes/NotFound.svelte';
import { wrap } from 'svelte-spa-router/wrap';

export default {
  "/": wrap({
    component: Main,
    conditions: [ () => Boolean(sessionStorage.getItem('code')) ]
  }),
  '/add': wrap({
    component: Add,
    conditions: [ () => Boolean(sessionStorage.getItem('code')) ]
  }),
  '/login': wrap({
    component: Login,
    conditions: [ () => !Boolean(sessionStorage.getItem('code')) ]
  }),
  '/info/:id': wrap({
    component: Info,
    conditions: [ () => Boolean(sessionStorage.getItem('code')) ]
  }),
  '/edit/:id': wrap({
    component: Edit,
    conditions: [ () => Boolean(sessionStorage.getItem('code')) ]
  }),
  '*': NotFound
};
