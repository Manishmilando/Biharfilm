import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const AlertBox = ({ 
  isOpen, 
  onClose, 
  type = "info", 
  title, 
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  onConfirm,
  autoClose = false,
  duration = 5000
}) => {
  
  React.useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, isOpen, duration, onClose]);

  const getIconConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-10 h-10" strokeWidth={2} />,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        };
      case "error":
        return {
          icon: <AlertCircle className="w-10 h-10" strokeWidth={2} />,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200"
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-10 h-10" strokeWidth={2} />,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200"
        };
      default:
        return {
          icon: <Info className="w-10 h-10" strokeWidth={2} />,
          color: "text-[#891737]",
          bgColor: "bg-[#891737]/5",
          borderColor: "border-[#891737]/20"
        };
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const iconConfig = getIconConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Professional Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-gray-900/50 z-[9998]"
            onClick={onClose}
          />

          {/* Alert Dialog */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                    <img 
                      src="/Logo1.png" 
                      alt="BSFDFC" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">BSFDFC</h4>
                    <p className="text-xs text-gray-500">Bihar State Film Development Corporation</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                {/* Icon Section */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-full ${iconConfig.bgColor} ${iconConfig.color} mx-auto mb-4`}>
                  {iconConfig.icon}
                </div>

                {/* Title */}
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {title}
                  </h3>
                )}

                {/* Message */}
                {message && (
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {message}
                  </p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4  border-t border-gray-100 flex gap-3 justify-end">
                {showCancel && (
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  onClick={handleConfirm}
                  className="px-5 py-2 text-sm font-medium text-white bg-[#891737] hover:bg-[#6e1129] rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#891737]/50"
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertBox;
