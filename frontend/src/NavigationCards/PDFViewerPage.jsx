import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Flipbook from "../Components/Flipbook";

const PDFViewerPage = () => {
    const { docId } = useParams();
    const navigate = useNavigate();

    // Map document IDs to file paths in public folder
    const documents = {
        "film-policy": "/FilmPolicy.pdf",
        "bihar-baiskop": "/BiharBaiskop.pdf",
        "goa-film-brochure": "/GoaFilmBrochure.pdf",
        "promotion-policy": "/PromotionPolicy.pdf",
    };

    const pdfFile = documents[docId];

    if (!pdfFile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Document Not Found</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-[#a92b4e] px-6 py-2 rounded-lg hover:bg-[#891737] transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Flipbook
                pdfFile={pdfFile}
                onClose={() => navigate(-1)}
            />
        </div>
    );
};

export default PDFViewerPage;
