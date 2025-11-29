import { useState, useEffect } from "react";
import { Upload, FileText, X, Loader, Save, FolderOpen } from "lucide-react";
import AlertBox from "../Components/AlertBox";

function AddTender({ tenderData, onClose }) {
  const MAX_WORDS = 50;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Alert State
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    autoClose: false
  });

  // Load previous data when tenderData is available
  useEffect(() => {
    if (tenderData) {
      setTitle(tenderData.title || "");

      const desc = tenderData.description || "";
      setDescription(desc);
      setWordCount(desc.trim().split(/\s+/).filter(Boolean).length);

      if (tenderData.date) {
        const dateObj = new Date(tenderData.date);
        const formattedDate = dateObj.toISOString().split('T')[0];
        setDate(formattedDate);
      }
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
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        showAlert({
          type: "error",
          title: "Invalid File",
          message: "Please upload a PDF file only."
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showAlert({
          type: "error",
          title: "File Too Large",
          message: "File size should be less than 10MB."
        });
        return;
      }
      setPdf(file);
    }
  };

  const showAlert = (config) => {
    setAlertConfig({
      isOpen: true,
      ...config
    });
  };

  const closeAlert = () => {
    setAlertConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleCreateTender = async () => {
    if (!title || !date || !description || !pdf) {
      showAlert({
        type: "warning",
        title: "Missing Fields",
        message: "Please fill in all fields and upload a PDF."
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("pdf", pdf);

    try {
      const response = await fetch(
        "https://biharfilmbackend-production.up.railway.app/api/tender/createTender",
        {
          method: "POST",
          body: formData,
          credentials: 'include'
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        showAlert({
          type: "success",
          title: "Success",
          message: "Tender created successfully!",
          autoClose: true,
          duration: 2000,
          onConfirm: () => {
            if (onClose) onClose();
          }
        });

        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        throw new Error(result.message || "Failed to create tender");
      }
    } catch (error) {
      console.error("Error creating tender:", error);
      showAlert({
        type: "error",
        title: "Error",
        message: error.message || "Failed to create tender. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTender = async () => {
    if (!title || !date || !description) {
      showAlert({
        type: "warning",
        title: "Missing Fields",
        message: "Please fill in all required fields."
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);

    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await fetch(
        `https://biharfilmbackend-production.up.railway.app/api/tender/updateTender/${tenderData.id}`,
        {
          method: "PUT",
          body: formData,
          credentials: 'include'
        }
      );

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server returned ${response.status} ${response.statusText}.`);
      }

      if (response.ok && result.success) {
        showAlert({
          type: "success",
          title: "Success",
          message: "Tender updated successfully!",
          autoClose: true,
          duration: 2000,
          onConfirm: () => {
            if (onClose) onClose();
          }
        });

        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        throw new Error(result.message || "Failed to update tender");
      }
    } catch (error) {
      console.error("Error updating tender:", error);
      showAlert({
        type: "error",
        title: "Error",
        message: error.message || "Failed to update tender. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (tenderData) {
      handleUpdateTender();
    } else {
      handleCreateTender();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative">
      <AlertBox {...alertConfig} onClose={closeAlert} />

      {/* Header */}
      <div className="bg-[#a92b4e] px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <FolderOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">
              {tenderData ? "Edit Tender" : "Create Tender"}
            </h2>
            <p className="text-white/80 text-xs">
              {tenderData ? "Update tender details" : "Add new tender notice"}
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {/* Title & Date */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block uppercase tracking-wide">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Procurement of Film Equipment"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#a92b4e] focus:ring-2 focus:ring-[#a92b4e]/20 outline-none transition-all bg-gray-50 focus:bg-white text-sm text-gray-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block uppercase tracking-wide">Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#a92b4e] focus:ring-2 focus:ring-[#a92b4e]/20 outline-none transition-all bg-gray-50 focus:bg-white text-sm text-gray-900"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block uppercase tracking-wide">Description *</label>
          <div className="relative">
            <textarea
              rows="3"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter a brief description..."
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#a92b4e] focus:ring-2 focus:ring-[#a92b4e]/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none text-sm text-gray-900"
            ></textarea>
            <div className={`absolute bottom-2 right-2 text-[10px] font-medium px-1.5 py-0.5 rounded ${wordCount >= MAX_WORDS ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
              }`}>
              {wordCount}/{MAX_WORDS}
            </div>
          </div>
        </div>

        {/* PDF Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block uppercase tracking-wide">
            Attachment (PDF) {tenderData ? "" : "*"}
          </label>
          {tenderData && !pdf && (
            <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Current PDF is already uploaded. Upload a new file to replace it.
              </p>
            </div>
          )}
          <div className={`border-2 border-dashed rounded-xl p-4 transition-all text-center ${pdf ? "border-[#a92b4e] bg-[#a92b4e]/5" : "border-gray-300 hover:border-[#a92b4e] hover:bg-gray-50"
            }`}>
            <input
              type="file"
              id="pdfUpload"
              accept="application/pdf"
              onChange={handlePdfChange}
              className="hidden"
            />

            {pdf ? (
              <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="font-medium text-gray-900 truncate text-sm">{pdf.name}</p>
                    <p className="text-[10px] text-gray-500">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={() => setPdf(null)}
                  className="p-1.5 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label htmlFor="pdfUpload" className="cursor-pointer flex flex-col items-center justify-center py-2">
                <Upload className="w-6 h-6 text-gray-400 mb-1 group-hover:text-[#a92b4e]" />
                <p className="text-gray-900 font-medium text-sm">
                  {tenderData ? "Upload New PDF (Optional)" : "Upload PDF"}
                </p>
                <p className="text-[10px] text-gray-500">Max 10MB</p>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
        <button
          className="px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-[#a92b4e] hover:bg-[#8f2442] text-white rounded-lg font-medium shadow-md shadow-[#a92b4e]/20 flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 text-sm"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>{tenderData ? "Updating..." : "Saving..."}</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{tenderData ? "Update" : "Publish"}</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}

export default AddTender;
