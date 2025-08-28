import { useState } from "react";

function  AddNotification() {
  const MAX_WORDS = 50;
  const [description, setDescription] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean);

    if (words.length <= MAX_WORDS) {
      setDescription(text);
      setWordCount(words.length);
    }
  };

  return (
    <div className="my-20 max-w-screen-md border border-gray-300 px-4  sm:mx-4 sm:rounded-xl sm:px-6 sm:py-4 md:mx-auto bg-white text-black">
      {/* Header */}
      <div className="flex flex-col border-b border-gray-300 pb-3 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm: py-2">
          <p className="font-medium text-lg"> Notification</p>
          <p className="text-sm text-gray-700">Fill out  Notification details</p>
        </div>
        <button
          className="hidden rounded-lg border border-transparent px-3  py-2 text-sm font-medium text-white sm:inline focus:outline-none focus:ring"
          style={{ backgroundColor: "#891737" }}
        >
          Save
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col space-y-4 mt-4">
        {/* Title */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <p className="shrink-0 w-28 font-medium">Title</p>
          <input
            placeholder="Enter  Notification Title"
            className="w-full rounded-md border border-gray-300 bg-white px-2  py-2 text-sm outline-none focus:ring-1"
            style={{ ringColor: "#891737" }}
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <p className="shrink-0 w-28 font-medium">Date</p>
          <input
            type="date"
            className="w-full rounded-md border border-gray-300 bg-white px-2  py-2 text-sm outline-none focus:ring-1"
            style={{ ringColor: "#891737" }}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <p className="shrink-0 w-28 font-medium">Description</p>
          <div className="w-full">
            <textarea
              placeholder="Enter  Notification Description"
              rows="3"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:ring-1"
              style={{ ringColor: "#891737" }}
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
          <div className="shrink-0 w-28 sm: py-2">
            <p className="mb-auto font-medium">Upload PDF</p>
            <p className="text-xs text-gray-600">Attach  Notification File</p>
          </div>
          <div className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 p-3 text-center">
            <p className="text-xs text-gray-600">
              Drop your PDF file here or click below to upload
            </p>

            {/* Custom File Upload */}
            <label
              htmlFor="pdfUpload"
              className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 text-center"
              style={{ color: "#891737", borderColor: "#891737" }}
            >
              Upload PDF
            </label>
            <input id="pdfUpload" type="file" accept="application/pdf" className="hidden" />
          </div>
        </div>
      </div>

      {/* Mobile Buttons */}
      <div className="flex justify-end mt-4 sm:hidden">
        <button className="mr-2 rounded-lg border px-3  py-2 text-sm font-medium text-black focus:outline-none focus:ring hover:bg-gray-200">
          Cancel
        </button>
        <button
          className="rounded-lg border border-transparent px-3  py-2 text-sm font-medium text-white focus:outline-none focus:ring"
          style={{ backgroundColor: "#891737" }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default  AddNotification;
