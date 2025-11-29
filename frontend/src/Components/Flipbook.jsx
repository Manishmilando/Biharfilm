import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronsRight } from "lucide-react";

// Use local worker file served by Vite
// Use CDN worker
// Use CDN worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <div>{props.children}</div>
      {/* <div>Page number: {props.number}</div> */}
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook({ pdfFile, onClose }) {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleClose = () => {
    console.log("Close button clicked!"); // Debug log
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="h-[110vh] flex flex-col gap-5 justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden relative">
        <div className="w-full flex justify-start px-8 pl-18">
          <button
            onClick={handleClose}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg font-medium z-50"
            style={{ zIndex: 9999 }}
          >
            ← Back
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-36 z-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 shadow-xl">
          <p className="text-white font-medium text-sm flex items-center gap-2">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent font-semibold">
              Click on Book to flip page
            </span>
            <span className="text-yellow-400 animate- text-lg">
              <ChevronsRight />
            </span>
          </p>
        </div>
        <HTMLFlipBook
          width={600}
          height={780}
          showCover={true}
          maxShadowOpacity={0.5}
          drawShadow={true}
          className="z-50"
        >
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum + 1}>
              <Document
                file={pdfFile || pdf}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pNum + 1}
                  width={600}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
              {/* <div>Page {pNum + 1} of {numPages}</div> */}
            </Pages>
          ))}
        </HTMLFlipBook>
      </div>
    </>
  );
}

export default Flipbook;
