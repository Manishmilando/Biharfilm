import React from "react";
import { CheckCircle2, Clock, Send, XCircle, FileCheck, AlertCircle } from "lucide-react";

const NOCTimeline = ({ nocForm }) => {
  // Timeline steps based on status
  const getTimelineSteps = () => {
    const steps = [
      {
        id: 1,
        title: "Application Submitted",
        description: "Your NOC form has been submitted successfully",
        date: nocForm.createdAt,
        status: "completed",
        icon: FileCheck,
        color: "blue"
      },
      {
        id: 2,
        title: "Under Review",
        description: nocForm.adminActionBy 
          ? `Reviewed by ${nocForm.adminActionBy}` 
          : "Admin is reviewing your application",
        date: nocForm.status === "under_review" ? nocForm.adminActionAt : null,
        status: nocForm.status === "submitted" ? "pending" : "completed",
        icon: Clock,
        color: "yellow",
        remarks: nocForm.adminRemarks
      },
      {
        id: 3,
        title: "Forwarded to District",
        description: nocForm.forwardedToDistricts?.length > 0
          ? `Forwarded to ${nocForm.forwardedToDistricts.map(d => d.districtName).join(", ")}`
          : "Forwarding to district administration",
        date: nocForm.forwardedAt,
        status: nocForm.status === "forwarded" || nocForm.status === "approved" || nocForm.status === "rejected" 
          ? "completed" 
          : nocForm.status === "under_review" ? "current" : "pending",
        icon: Send,
        color: "purple",
        showDepartments: true
      }
    ];

    // Final step - Approved or Rejected
    if (nocForm.status === "approved") {
      steps.push({
        id: 4,
        title: "✅ Approved by District Admin",
        description: nocForm.districtActionBy 
          ? `Approved by ${nocForm.districtActionBy}` 
          : "Your application has been approved",
        date: nocForm.districtActionAt,
        status: "completed",
        icon: CheckCircle2,
        color: "green",
        remarks: nocForm.districtRemarks
      });
    } else if (nocForm.status === "rejected") {
      steps.push({
        id: 4,
        title: "❌ Rejected",
        description: nocForm.districtActionBy 
          ? `Rejected by ${nocForm.districtActionBy}` 
          : "Your application has been rejected",
        date: nocForm.districtActionAt || nocForm.rejectedAt,
        status: "rejected",
        icon: XCircle,
        color: "red",
        remarks: nocForm.districtRemarks || nocForm.adminRemarks
      });
    } else if (nocForm.status === "forwarded") {
      steps.push({
        id: 4,
        title: "Awaiting District Decision",
        description: "District admin is reviewing your application",
        date: null,
        status: "current",
        icon: Clock,
        color: "yellow"
      });
    }

    return steps;
  };

  const timelineSteps = getTimelineSteps();

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-500 text-green-700";
      case "current":
        return "bg-blue-100 border-blue-500 text-blue-700 animate-pulse";
      case "rejected":
        return "bg-red-100 border-red-500 text-red-700";
      case "pending":
        return "bg-gray-100 border-gray-300 text-gray-500";
      default:
        return "bg-gray-100 border-gray-300 text-gray-500";
    }
  };

  const getIconColor = (color, status) => {
    if (status === "pending") return "text-gray-400";
    
    switch (color) {
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      case "blue":
        return "text-blue-600";
      case "yellow":
        return "text-yellow-600";
      case "purple":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Clock size={24} className="text-[#a92b43]" />
        Application Timeline
      </h3>

      <div className="relative">
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === timelineSteps.length - 1;

          return (
            <div key={step.id} className="relative pb-8">
              {/* Vertical Line */}
              {!isLast && (
                <div className={`absolute left-5 top-12 w-0.5 h-full ${
                  step.status === "completed" ? "bg-green-500" : "bg-gray-300"
                }`}></div>
              )}

              {/* Timeline Item */}
              <div className="flex gap-4">
                {/* Icon Circle */}
                <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}>
                  <Icon size={20} className={getIconColor(step.color, step.status)} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{step.title}</h4>
                      {step.date && (
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(step.date)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>

                    {/* Show Forwarded Districts/Departments */}
                    {step.showDepartments && nocForm.forwardedToDistricts?.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Forwarded to:</p>
                        <div className="flex flex-wrap gap-2">
                          {nocForm.forwardedToDistricts.map((district, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded border border-purple-200"
                            >
                              {district.districtName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.showDepartments && nocForm.forwardedToDepartments?.length > 0 && (
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          {nocForm.forwardedToDepartments.map((dept, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded border border-indigo-200"
                            >
                              {dept.departmentName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show Remarks */}
                    {step.remarks && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="flex items-start gap-2">
                          <AlertCircle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-yellow-800 mb-1">Remarks:</p>
                            <p className="text-sm text-yellow-900">{step.remarks}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status Badge */}
                    {step.status === "current" && (
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                          <Clock size={12} />
                          Current Stage
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NOCTimeline;
