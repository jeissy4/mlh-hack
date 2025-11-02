import React, { useState } from "react";

export default function LessonForm({ setLesson, setLoading }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [creative, setCreative] = useState(false);

  const generateLesson = async (e) => {
    e.preventDefault();

    if (!subject || !topic || !level) {
      setLesson("⚠️ Please fill in all fields before generating a lesson.");
      return;
    }

    setLoading(true);
    setLesson(""); // clear previous content

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a professional teacher assistant. 
Generate a detailed, engaging, and inclusive lesson plan for:
- Subject: ${subject}
- Topic: ${topic}
- Student Level: ${level}
- Creativity mode: ${creative ? "Yes" : "No"}

Include these sections clearly labeled with markdown headings (##):
1. Overview
2. Learning Objectives
3. Lesson Plan Steps
4. Examples or Activities
5. Quiz
6. Teacher Tips

Keep the tone educational and friendly.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini raw response:", data);

      let text = "⚠️ No response from Gemini.";

      // Safely parse the text output
      if (data?.candidates?.length > 0) {
        const parts = data.candidates[0].content?.parts;
        if (Array.isArray(parts) && parts.length > 0) {
          text = parts.map((p) => p.text || "").join("\n");
        }
      }

      setLesson(text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setLesson("⚠️ Gemini request failed. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="lesson-form" onSubmit={generateLesson}>
      <h2>Build a Lesson Plan</h2>

      <label>Subject</label>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="e.g. English"
        required
      />

      <label>Topic</label>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. Grammar"
        required
      />

      <label>Student Level</label>
      <input
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="e.g. Beginner, Intermediate, Advanced"
        required
      />

      <label>
        <input
          type="checkbox"
          checked={creative}
          onChange={() => setCreative(!creative)}
        />
        Add creative activities
      </label>

      <button type="submit">✨ Generate Lesson</button>
    </form>
  );
}
