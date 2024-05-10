//request

import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

const API_URL="http://localhost:4000";

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Get all students
app.get("/", async (req,res)=>{

    try{
        const result=await axios.get(`${API_URL}/students`);
        console.log(result.data);
        res.render("index.ejs",{students: result.data});
    }
    catch(error){
        res.status(500).json("Error fetching students");
    }
});

//route to the edit page
app.get("/new", (req,res)=>{
    res.render("modify.ejs",{heading:"New Student", submit:"Create Student"});
});

app.get("/edit/:id", async (req,res)=>{
    try{
        const result=await axios.get(`${API_URL}/students/${req.params.id}`);
        console.log(result.data);
        res.render("modify.ejs",{
            heading:"Edit Student",
            submit: "Update Student",
            student: result.data
        });
    }
    catch(error){
        res.status(500).json({message: "Error fetching student"});
    }
});

//create a student

app.post("/api/students", async (req,res)=> {
    try{
        const result = await axios.post(`${API_URL}/students`,req.body);
        console.log(result.data);
        res.redirect("/");
    }
    catch(error){
        res.status(500).json("Error fetching students");
    }
});

//Edit a student
app.post("/api/students/:id", async (req,res)=>{
    try{
        const result=await axios.patch(`${API_URL}/students/${req.params.id}`,req.body);
        console.log(result.data);
        res.redirect("/");
    }
    catch(error){
        res.status(500).json("Error fetchng students");
    }
});

//Delete a student
app.get("/api/students/delete/:id", async (req,res)=>{
    try{
        const result=await axios.delete(`${API_URL}/students/${req.params.id}`);
        res.redirect("/");
        console.log("Deletion successful");   
    }
    catch(error){
        res.status(500).json("Error deleting a student");
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});




