import { useState, useEffect } from "react";
import axios from "axios";

function Tender({ tenderData, onClose }) {
  const MAX_WORDS = 50;
  // Initialize form state with tenderData if editing or defaults if creating
  const [title, setTitle] = useState(tenderData?.title || "");
  const [date, setDate] = useState(tenderData?.date || "");
  const [description, setDescription] = useState(tenderData?.description || "");
  const [pdf, setPdf] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initialize word count when editing
  useEffect(() => {
    if (tenderData && tenderData.description) {
      const words = tenderData.description.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    }
  }, [tenderData]);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean);

    if (words.length <= MAX_WORDS) {
      setDescription(text);
      setWordCount(words.length);
    }
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // For editing, PDF is optional (only required if creating new tender)
    if (!title || !date || !description || (!pdf && !tenderData)) {
      alert("Please fill out all fields and upload a PDF");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("description", description);
      
      // Only append PDF if a new file is selected
      if (pdf) {
        formData.append("pdf", pdf);
      }

      if (tenderData) {
        // Edit mode - PUT request
        await axios.put(
          `https://biharfilmbackend-production.up.railway.app/api/tender/tenders/${tenderData.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        // Create mode - POST request
        await axios.post(
          "https://biharfilmbackend-production.up.railway.app/api/tender/createTender",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      setLoading(false);
      setSuccess(true);

      // Reset form only if creating new tender
      if (!tenderData) {
        setTitle("");
        setDate("");
        setDescription("");
        setPdf(null);
        setWordCount(0);
      }

      // Hide success popup and close modal
      setTimeout(() => {
        setSuccess(false);
        onClose(); // Close the modal and refresh the parent component
      }, 2000);
    } catch (err) {
      console.error("Error saving tender:", err);
      setLoading(false);
      alert("Error saving tender. Please try again.");
    }
  };

  return (
    <div className="relative my-20 max-w-screen-md border border-gray-300 px-4 sm:mx-4 sm:rounded-xl sm:px-6 sm:py-4 md:mx-auto bg-white text-black">
      {/* Success Popup */}
      {success && (
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {tenderData ? "Tender Updated Successfully!" : "Tender Saved Successfully!"}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col border-b border-gray-300 pb-3 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-2">
          <p className="font-medium text-lg">
            {tenderData ? "Edit Tender" : "Add New Tender"}
          </p>
          <p className="text-sm text-gray-700">
            {tenderData ? "Update tender details" : "Fill out tender details"}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="hidden rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white sm:inline focus:outline-none focus:ring"
          style={{ backgroundColor: "#891737" }}
        >
          {loading ? "Saving..." : tenderData ? "Update" : "Save"}
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col space-y-4 mt-4">
        {/* Title */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <p className="shrink-0 w-28 font-medium">Title</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Tender Title"
            className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:ring-1"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <p className="shrink-0 w-28 font-medium">Date</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:ring-1"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <p className="shrink-0 w-28 font-medium">Description</p>
          <div className="w-full">
            <textarea
              placeholder="Enter Tender Description"
              rows="3"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:ring-1"
            ></textarea>
            <p
              className={`text-xs mt-1 ${
                wordCount >= MAX_WORDS ? "text-red-500" : "text-gray-600"
              }`}
            >
              {MAX_WORDS - wordCount} words remaining
            </p>
          </div>
        </div>

        {/* PDF Upload */}
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="shrink-0 w-28 sm:py-2">
            <p className="mb-auto font-medium">Upload PDF</p>
            <p className="text-xs text-gray-600">
              {tenderData ? "Upload new file (optional)" : "Attach Tender File"}
            </p>
            {tenderData && tenderData.pdf && (
              <a 
                href={tenderData.pdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline block mt-1"
              >
                View current PDF
              </a>
            )}
          </div>
          <div className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-3 text-center">
            <p className="text-xs text-gray-600">
              {tenderData 
                ? "Drop new PDF file here or click below to update"
                : "Drop your PDF file here or click below to upload"
              }
            </p>
            <label
              htmlFor="pdfUpload"
              className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
              style={{ color: "#891737", borderColor: "#891737" }}
            >
              {tenderData ? "Update PDF" : "Upload PDF"}
            </label>
            <input 
              id="pdfUpload" 
              type="file" 
              accept="application/pdf" 
              onChange={handlePdfChange} 
              className="hidden" 
            />
            {pdf && (
              <p className="text-xs text-green-600 mt-1">
                New file selected: {pdf.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Save Button */}
      <div className="flex justify-end mt-4 sm:hidden">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring"
          style={{ backgroundColor: "#891737" }}
        >
          {loading ? "Saving..." : tenderData ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default Tender;
