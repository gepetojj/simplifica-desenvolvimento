import express from 'express';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import pointsRouter from './routes/points';
import tableRanking from './routes/table';
import content from './routes/progress';
import community from './routes/community';
import aprender from './routes/content';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Request } from 'express';
import '../prisma/seed/seed';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json({ limit: '500mb' }));
app.use(
  express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 500000 })
);

//permite utilizar diversos tipos de requisição no postman, não somente em json
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
app.use(cors<Request>());

app.get('/', (req, res) => {
  res.json({ msg: 'Olá, mundo!' });
});

// Utiliza Router do Express para agrupar rotas da API
// Obs.: talvez seja melhor transferir para um arquivo separado

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/points', pointsRouter);
router.use('/table', tableRanking);
router.use('/content', content);
router.use('/community', community);
router.use('/aprender', aprender);

app.use('/api', router);

Object.keys(require.cache).forEach(function (key) {
  delete require.cache[key];
});

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log('Rodando na porta ' + PORT);
});
