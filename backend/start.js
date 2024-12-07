import express, { request, response } from "express";
import { PORT, mongourl } from "./config.js";
import mongoose from 'mongoose';
import { Cloth } from './models/clothModel.js';
import clothesRoutes from './routes/clothesRoutes.js'
import cors from 'cors';




const app = express();
app.use(cors());


app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello');
});

app.use('/cloth', clothesRoutes);

mongoose.connect(mongourl)
.then(() => {
    console.log('Connected');
    const server = app.listen(PORT, () => {
        console.log(`App is listening on port ${server.address().port}`);
      });
})
.catch((error) => {console.log(error);});