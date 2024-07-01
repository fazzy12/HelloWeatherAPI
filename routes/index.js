import express from 'express';
import helloController from '../controllers/helloController.js';


const router = express.Router();




router.get('/api/hello', helloController.hello);




export default router;
