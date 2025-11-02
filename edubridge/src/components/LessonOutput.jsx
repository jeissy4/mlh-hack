import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";

export default function LessonOutput({ lesson, loading }) {
  const outputRef = useRef();
  const [showToast, setShowToast] = useState(false);

  const handleExportPDF = () => {
    if (!lesson) return;

    const element = outputRef.current;
    if (!element) return;

    // Temporarily expand scroll area for full export
    const originalStyle = element.style.overflowY;
    const originalMaxHeight = element.style.maxHeight;

    element.style.overflowY = "visible";
    element.style.maxHeight = "none";

    const opt = {
      margin: 0.5,
      filename: "EduBridge_LessonPlan.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        // ✅ Restore styles after export
        element.style.overflowY = originalStyle;
        element.style.maxHeight = originalMaxHeight;

        // ✅ Show success toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch(() => {
        element.style.overflowY = originalStyle;
        element.style.maxHeight = originalMaxHeight;
      });
  };

  if (loading) return <div className="loader">Generating full lesson with Gemini...</div>;

  return (
    <div className="lesson-output-container">
      <div className="lesson-output-header">
        <h2>Generated Lesson</h2>
        {lesson && (
          <div className="btn-group">
            <button className="export-btn" onClick={handleExportPDF}>
              📄 Export PDF
            </button>
          </div>
        )}
      </div>

      <div ref={outputRef} className="lesson-output">
        {lesson ? (
          <ReactMarkdown>{lesson}</ReactMarkdown>
        ) : (
          <p className="placeholder">Your lesson will appear here 👇</p>
        )}
      </div>

      {/* ✅ Toast Notification */}
      {showToast && (
        <div className="toast-message">✅ PDF downloaded successfully!</div>
      )}
    </div>
  );
}
