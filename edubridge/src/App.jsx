import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LessonForm from "./components/LessonForm.jsx";
import LessonOutput from "./components/LessonOutput.jsx";


export default function App() {
  const [lesson, setLesson] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <LessonForm setLesson={setLesson} setLoading={setLoading} />
        <LessonOutput lesson={lesson} loading={loading} setLesson={setLesson} />
      </div>
    </div>
  );
}
