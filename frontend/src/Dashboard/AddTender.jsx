import { useState } from "react";
import axios from "axios";

function Tender() {
  const MAX_WORDS = 50;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    if (!title || !date || !description || !pdf) {
      alert("Please fill out all fields and upload a PDF");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("pdf", pdf);

      await axios.post("https://biharfilmbackend-production.up.railway.app/api/tender/createTender", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      setSuccess(true);

      // Reset form
      setTitle("");
      setDate("");
      setDescription("");
      setPdf(null);

      // Hide success popup after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving tender:", err);
      setLoading(false);
    }
  };

  return (
    <div className="relative my-20 max-w-screen-md border border-gray-300 px-4 sm:mx-4 sm:rounded-xl sm:px-6 sm:py-4 md:mx-auto bg-white text-black">
      {/* Success Popup */}
      {success && (
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          Tender Saved Successfully!
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col border-b border-gray-300 pb-3 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-2">
          <p className="font-medium text-lg">Tender</p>
          <p className="text-sm text-gray-700">Fill out tender details</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="hidden rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white sm:inline focus:outline-none focus:ring"
          style={{ backgroundColor: "#891737" }}
        >
          {loading ? "Saving..." : "Save"}
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
            <p className="text-xs text-gray-600">Attach Tender File</p>
          </div>
          <div className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-3 text-center">
            <p className="text-xs text-gray-600">
              Drop your PDF file here or click below to upload
            </p>
            <label
              htmlFor="pdfUpload"
              className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
              style={{ color: "#891737", borderColor: "#891737" }}
            >
              Upload PDF
            </label>
            <input id="pdfUpload" type="file" accept="application/pdf" onChange={handlePdfChange} className="hidden" />
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
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default Tender;
