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

// PARAPHRASE
app.post("/paraphrase", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",   // 🔥 UPDATED MODEL
        messages: [
          { role: "user", content: "Rewrite this sentence properly: " + text }
        ]
      })
    });

    const data = await response.json();

    console.log("PARA RESPONSE:", data);

    if (data.error) {
      return res.json({ result: "API ERROR: " + data.error.message });
    }

    res.json({
      result: data.choices?.[0]?.message?.content || "No result"
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.json({ result: "SERVER ERROR" });
  }
});

// CAPTION
app.post("/caption", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",   // 🔥 UPDATED MODEL
        messages: [
          { role: "user", content: "Write a catchy caption: " + prompt }
        ]
      })
    });

    const data = await response.json();

    console.log("CAPTION RESPONSE:", data);

    if (data.error) {
      return res.json({ result: "API ERROR: " + data.error.message });
    }

    res.json({
      result: data.choices?.[0]?.message?.content || "No result"
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.json({ result: "SERVER ERROR" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
