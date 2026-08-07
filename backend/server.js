require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./db");

const Project = require("./project");
const Contact = require("./contact");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// Home Route
// =======================

app.get("/", (req, res) => {
    res.send("Portfolio Backend Running...");
});

// =======================
// Projects Routes
// =======================

// Get All Projects
app.get("/projects", async (req, res) => {
    try {
        const data = await Project.find();
        res.json(data);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch projects"
        });
    }
});

// Add Project
app.post("/projects", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();

        res.json({
            success: true,
            message: "Project Added Successfully"
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Error adding project"
        });
    }
});

// =======================
// Contact Routes
// =======================

// Save Contact Message
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contact = new Contact({
            name,
            email,
            message
        });

        await contact.save();

        res.json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
});

// Get All Contact Messages
app.get("/api/contact", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.json(contacts);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch contacts"
        });
    }
});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});