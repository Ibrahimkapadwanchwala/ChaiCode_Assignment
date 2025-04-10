const express=require('express');
const app=express();
const path=require('path')
const staticRouter=require('./routes/staticRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter=require('./routes/adminRoutes')
const reservationRouter=require('./routes/reservationRoute')
require('dotenv').config();
const connectDB=require('./configs/mongodb.config')
const cookieparser=require('cookie-parser')

app.use(cookieparser());
app.use(express.json());
connectDB();
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set(express.static(path.join(__dirname,"public")))
app.use('/',staticRouter);
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/reservation',reservationRouter);
const PORT=process.env.PORT||4000;
app.listen(PORT,()=>console.log(`Server Started listening on PORT ${PORT}`)
)