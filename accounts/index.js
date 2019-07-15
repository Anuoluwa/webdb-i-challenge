import express from 'express';
import accountRoutes from './accountRoutes';

const route = express.Router();


route.use('/accounts', accountRoutes);



export default route;