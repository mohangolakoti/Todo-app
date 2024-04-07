const express = require('express')
const mongoose = require('mongoose')
const TaskSchema = require('./model')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    origin:'*'
}))

/* mongoose.connect("mongodb+srv://ramgolakoti1:ramgolakoti@cluster0.dpstdqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>console.log('Connected Successfully!')
) */
mongoose.connect("mongodb://localhost:27017/").then(()=>console.log("Connected Successfully!"))

app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo:todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){console.log("ERROR:"+err)}
})

app.get('/gettask',async(req,res)=>{
    try{
        return res.json(await TaskSchema.find())
    }
    catch{
        console.log("Error:"+err)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find()) 
    }
    catch{
        console.log("ERROR:"+err)
    }
})

app.listen(5000,()=>console.log("Server running at port 5000"));