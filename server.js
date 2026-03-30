const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

// Health check
app.get("/", (req, res) => {
  res.send("API Running");
});

app.post("/paraphrase", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: "Rewrite this sentence properly: " + text }
        ]
      })
    });

    const data = await response.json();

    console.log("PARAPHRASE RESPONSE:", data); // 🔥 debug

    res.json({
      result: data.choices?.[0]?.message?.content || "No result"
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.json({ result: "SERVER ERROR" });
  }
});
app.post("/caption", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: "Write a catchy caption: " + prompt }
        ]
      })
    });

    const data = await response.json();

    console.log("CAPTION RESPONSE:", data); // 🔥 debug

    res.json({
      result: data.choices?.[0]?.message?.content || "No result"
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.json({ result: "SERVER ERROR" });
  }
});
