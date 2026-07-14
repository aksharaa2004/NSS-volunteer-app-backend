const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb://akshara:Akak4812@ac-kaukwea-shard-00-00.dz9thle.mongodb.net:27017,ac-kaukwea-shard-00-01.dz9thle.mongodb.net:27017,ac-kaukwea-shard-00-02.dz9thle.mongodb.net:27017/volunteerdb?ssl=true&replicaSet=atlas-9gt2a1-shard-0&authSource=admin&appName=Cluster0"
).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => {
    console.log(error);
});

const Volunteer = mongoose.model("Volunteer", new mongoose.Schema({
    volunteer_id: String,
    full_name: String,
    department: String,
    email: String,
    year_of_study: String,
    camp_name: String,
    phone: String,
    date_of_birth: String,
    gender: String,
    hours_completed: String,
    address: String,
    blood_group: String,
    unit_number: String
}));



app.get("/", (req, res) => {
    res.send("Volunteer API Running");
});


app.post("/add_volunteer", async (req, res) => {
    try {
        await Volunteer.create(req.body);
        res.json({ status: "success" });
    } catch (err) {
        res.json({ status: "failed", error: err.message });
    }
});


app.post("/view_volunteer", async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (err) {
        res.json({ status: "failed", error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server Started");
});