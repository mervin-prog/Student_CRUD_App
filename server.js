//Own API for students

import express from "express";
import bodyParser from "body-parser";

const app=express();
const port= 4000;
/* 
Using body-parser alone is suitable for handling form data that's encoded in 
application/x-www-form-urlencoded or application/json formats. 
However, when you're dealing with file uploads, 
the data is encoded differently as multipart/form-data, and body-parser 
does not handle this type of encoding.*/


let students = [
    {
        id: 1,
        name: "John Doe",
        address: "123 Main St, City, Country",
        role: "Frontend dev",
        image: "img1.jpg"
    },
    {
        id: 2,
        name: "Jaden Smith",
        address: "456 Elm St, Town, Country",
        role: "Backend dev",
        image: "img2.jpg"
    },
    {
        id: 3,
        name: "Alice Johnson",
        address: "789 Oak St, Village, Country",
        role: "Fullstack dev",
        image: "img3.jpg"
    }
];
let lastId=3;

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/students",(req,res)=>{
    console.log(students);
    res.json(students);
});

app.get("/students/:id", (req,res)=>{
    const student=students.find((s) => s.id===parseInt(req.params.id));
    if(!student){
        res.status(404).json({message:"Student not found"});
    }
    console.log(student);
    res.json(student);
});

//new Student
app.post("/students", (req,res)=>{
    const newid=lastId+=1;
    const student={
        id: newid,
        name: req.body.name,
        address: req.body.address,
        role: req.body.role,
        image: req.body.image
    };
    lastId=newid;
    console.log(student);
    students.push(student);
    res.status(201).json(student);
});

//edit a student
app.patch("/students/:id", (req,res)=>{
    const student=students.find((s) =>s.id===parseInt(req.params.id));

    if(!student){
        res.status(404).json({message: "Student not found"});
    }

    console.log(student);
    if(req.body.name) student.name=req.body.name;
    if(req.body.address) student.address=req.body.address;
    if(req.body.role) student.role=req.body.role;
    if(req.body.image) student.image=req.body.image;

    console.log(student);
    res.json(student);
});

//delete a student
app.delete("/students/:id", (req,res)=> {
    const index=students.findIndex((s) =>s.id===parseInt(req.params.id));

    if(index===-1){
        res.status(404).json({message : "Student not found"});
    }
    students.splice(index,1);
    res.json({message: "Deletion successful"});
    console.log("Deletion successful");
});


//start the server
app.listen(port, ()=>{
    console.log(`API is running on ${port}`);
});