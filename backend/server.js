const express=require('express');
const { chats } = require('./data/data');
const dotenv=require('dotenv');
const connectDB=require('./config/db.js');

const app=express();
const userRoutes=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');
dotenv.config();
connectDB();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("api is running Successfully");
})
app.get('/api/chat',(req,res)=>{
     res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const singleChat=chats.find((c)=>c._id===req.params.id);
    res.send(singleChat);
})
app.use("/api/user",userRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||4000;
app.listen(PORT,console.log(`server is stated on Port ${PORT}`));
