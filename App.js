import express from 'express';
import { NODE_ENV, RUN_PORT } from './const/conts.js';

const App = express();

App.set('env', NODE_ENV)
App.set('port', RUN_PORT)

App.use(express.json({ limit: '500MB' }));
App.use(express.urlencoded({ extended: true }));

// ENDPOINTS
import routerUser from './routes/user.js';


export default App;