import express from 'express';
import cors from 'cors';
// cors is used to allow cross-origin requests btwn frontend and backend
import mongoose from 'mongoose';
// mongoose is used to connect to MongoDB
import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';


const app = express()

app.use(express.json());
app.use(cors());
// the above two lines are used to parse the incoming request body and allow cross-origin requests respectively
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose.connect("mongodb+srv://redmi1smail:J2NLv6A6usQvRe03@recipes.sr5nxht.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes")

const port = 3001;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});