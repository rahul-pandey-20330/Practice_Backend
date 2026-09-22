//server creat krne ke liye use hota hai
const express = require("express");
const app = express();

//express.json ek middelware hai iska use isliye kr rhe hai taki postman se aane wala data server pr read kr paye

app.use(express.json())
module.exports=app;
/*  note ={
    title: "my first note"
    discription : "This is my first note"
  }
    to hm kya krenge ek notes naam ka array of object bnayenge jisse user apne multiple note create kr paye 
    const note =[{title:"my first note",
                discription:"this is my first note"
    }]
                iske liye hm empty array bnayenge jisme user apne note create kr payega payega api req ke through
*/
const notes = []
//Post method use hota hai frontened se data server pe bejne ke liye isliye hm post api create krenge
app.post("/notes",(req,res)=>{

notes.push(req.body);
res.status(201).json({message:"note created sucessfully"})
});

// ab hm jo data server pr aa rha hai use frontend prbejenge and uske liye GET method use hoga
app.get("/notes",(req,res)=>{
  res.status(200).json({message:"Respone Fetch Secussfully",
    notes:notes
  })
})

// now we are using delete method for deleting the notes and for that we are using DELETE Method
app.delete("/notes/:index",(req,res)=>{
 const index = req.params.index
 delete notes[index]
  res.status(200).json({meassage : "Notes deleted"})
})
// now we need to update our task for that we are using patch method
app.patch("/notes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const description = req.body.description; // ✅ body se lo

  if (!notes[index]) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[index].description = description;

  res.status(200).json({ message: "Updated Completed" });
});