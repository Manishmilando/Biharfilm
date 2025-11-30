import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flipbook from "../Components/Flipbook";
import Navbar from "../Components/Navbar";
import DocumentSelector from "../Components/DocumentSelector";

const PDFViewerPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const documents = {
    "film-policy": "/FilmPolicy.pdf",
    "bihar-baiskop": "/BiharBaiskop.pdf",
    "goa-film-brochure": "/GoaFilmBrochure.pdf",
    "promotion-policy": "/PromotionPolicy.pdf",
  };

  // If no docId → Show list of documents UI
  if (!docId) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="pt-24">
          <DocumentSelector documents={documents} />
        </div>
      </div>
    );
  }

  const pdfFile = documents[docId];

  if (!pdfFile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Document Not Found</h1>
          <button
            onClick={() => navigate("/document")}
            className="bg-[#a92b4e] px-6 py-2 rounded-lg hover:bg-[#891737] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Give some space below fixed navbar */}
      <div className="pt-24">
        <Flipbook
          pdfFile={pdfFile}
          onBack={() => navigate("/document")}
        />
      </div>
    </div>
  );
};

export default PDFViewerPage;
