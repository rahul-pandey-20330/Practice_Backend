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
app.get("/note",async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message : "Responce Fetch Sucessfully",
        notes : notes
    })
})
// now we gonna start to update aur note and for that we are using patch method
app.patch("/note/:id",async (req,res)=>{

    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

 const updatedNote = await noteModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
)
res.status(200).json({message : "Updates Sucessfully",
updatedNote : updatedNote

})
})
// Delete ke liye
app.delete("/note/:id",async (req,res)=>{
    const noteId = await noteModel.findByIdAndDelete(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json({
        meassage :"note deleted Compleated",
        noteId : noteId
    })
}
)
module.exports = app