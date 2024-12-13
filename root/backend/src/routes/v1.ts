import express from 'express'

import authRouter from './auth';
import todosRouter from './todos';

const v1Router =express.Router(); 


v1Router.use('/auth/',authRouter)
v1Router.use('/todos/', todosRouter)

export default v1Router