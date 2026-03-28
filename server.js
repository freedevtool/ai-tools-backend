const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

/* PARAPHRASER */
app.post("/paraphrase", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Rewrite clearly and naturally." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CAPTION */
app.post("/caption", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Generate catchy captions." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req,res)=>res.send("API Running"));

app.listen(3000, ()=>console.log("Server running"));
