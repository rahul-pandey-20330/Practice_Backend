const express = require("express");
const app = express() ; //server's instance
const noteModel = require("./models/note.model")
app.use(express.json())

//now we jump to create our note and for that  i use post method

app.post("/note", async (req,res)=>{
    // ab hm data ko store krwayenge
    const data = req.body
    await noteModel.create({
        title :data.title,
        description: data.description
    })
    res.status(201).json({meassage : "Note created secessfully"})
})

// now hm ab read krenge
app.get("/note",(req,res)=>{
    
})
module.exports = app