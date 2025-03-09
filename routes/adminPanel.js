const express= require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const Feed  = require("../models/feedBackModel");
const env = require("dotenv").config();
const Pdf = require("../models/pdfSchema");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadbook", upload.single("file"), async (req, res) => {
    try {
        const newPdf = new Pdf({
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype
        });
        await newPdf.save();
        res.json({ message: "File uploaded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/book/:id", async (req, res) => {
    try {
        const file = await Pdf.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });

        res.contentType(file.contentType);
        res.send(file.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/api",upload.single("file"),(req,res)=>{
    return res.status(200).json(req.file);;
});

router.get("/books",async(req,res)=>{
    const file = await Pdf.find({});
    if(file.length === 0){
        return res.status(404).json({message:"no books are found"});
    }
    return res.status(200).json({file});
});

router.delete("/deletebook/:id",async(req,res)=>{
    try{

        const file = await Pdf.findByIdAndDelete(req.params.id);
    if(!file){
        return res.status(404).json({message:"book doesn't exist"});
    };

    return res.status(200).json({message:"book deleted"});

    }catch(err){
        return res.status(400).json({message:err.message})
    }

});


router.get("/views",(req,res)=>{
    if(req.url === "/favicon"){
        res.end();
    };

    const json = fs.readFileSync("count.json","utf-8");
    const obj = JSON.parse(json);
    obj.pageviews = obj.pageviews+1
    if(req.query.type === "visit-pageviews"){
        obj.vists = obj.vists+1
    };

    const newJson = JSON.stringify(obj);

    const add = fs.writeFileSync("count.json" , newJson );

    res.json({newJson});
});

router.post("/feedback" , async(req,res)=>{
   try{
    const {comment,stars} = req.body;
    if(!name||!email||!comment||!stars){
        return res.status(400).json({message:"all fields are required"});
    }
    const feed = await Feed.create({
        comment,
        stars:`${stars} stars`
    });
    return res.status(200).json(feed);

   }catch(Err){
    return res.status(400).json({message:Err.message});
   }
});

router.get("/feedbacks",async(req,res)=>{
    try{
        const findFeeds = await Feed.find({});
        if(findFeeds.length ===0 ){

         return res.status(400).json({message:"there is no comments yet"});

        }

        return res.status(200).json({findFeeds});

    }catch(Err){
        return res.status(400).json({message:Err.message})        
    };
})


module.exports = router;