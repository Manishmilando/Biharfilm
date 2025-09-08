import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  FaFolderOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaFilter,
  FaDownload,
  FaClock,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Accepted: {
      style: "bg-green-50 text-green-700 border border-green-200",
      icon: <FaCheckCircle className="w-3 h-3 text-green-600" />,
    },
    Rejected: {
      style: "bg-red-50 text-red-700 border border-red-200",
      icon: <FaTimesCircle className="w-3 h-3 text-red-600" />,
    },
    Pending: {
      style: "bg-amber-50 text-amber-700 border border-amber-200",
      icon: <FaClock className="w-3 h-3 text-amber-600" />,
    },
  };

  const displayStatus = status || "Pending";
  const config = statusConfig[displayStatus] || statusConfig["Pending"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${config.style}`}
    >
      {config.icon}
      {displayStatus}
    </span>
  );
};

const StatsCard = ({ title, value, subtitle, icon, isHighlight }) => {
  const cardStyle = isHighlight 
    ? "bg-gradient-to-br from-[#a92b4e] to-[#8a2340] text-white border-[#a92b4e]"
    : "bg-white text-gray-900 border-gray-200";
  
  const iconStyle = isHighlight 
    ? "bg-white/20 text-white"
    : "bg-gray-50 text-[#a92b4e]";

  return (
    <div className={`border rounded-xl p-4 hover:shadow-md transition-all duration-200 ${cardStyle}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconStyle}`}>
          {React.cloneElement(icon, { className: "text-base" })}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-md ${
          isHighlight 
            ? "bg-white/20 text-white" 
            : "bg-gray-100 text-gray-700"
        }`}>
          {value}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">{value}</h3>
        <p className={`text-sm font-medium ${isHighlight ? "text-white/90" : "text-gray-700"}`}>
          {title}
        </p>
        <p className={`text-xs ${isHighlight ? "text-white/70" : "text-gray-500"}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const TableRow = ({ noc, index, formatDate, onDownloadSingle }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-4 py-4 text-sm text-gray-500 w-16">
        {String(index + 1).padStart(2, '0')}
      </td>
      <td className="px-4 py-4 w-32">
        <span className="text-sm text-gray-900 font-medium">{noc.typeOfProject}</span>
      </td>
      <td className="px-4 py-4 w-24">
        <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
          {noc.duration}
        </span>
      </td>
      <td className="px-4 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900 truncate max-w-48" title={noc.title}>
            {noc.title}
          </p>
          <p className="text-xs text-gray-500">{noc.genre}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{noc.representative}</p>
          <p className="text-xs text-gray-500 truncate max-w-40" title={noc.email}>
            {noc.email}
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-700 w-28">
        {formatDate(noc.startDate)}
      </td>
      <td className="px-4 py-4 text-sm text-gray-700 w-28">
        {formatDate(noc.endDate)}
      </td>
      <td className="px-4 py-4 w-32">
        <StatusBadge status={noc.status} />
      </td>
      <td className="px-4 py-4 w-24">
        <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDownloadSingle(noc, index)}
            className="p-2 text-gray-400 hover:text-[#a92b4e] transition-colors"
            title="Download PDF"
          >
            <FaDownload className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const FilmmakerOverview = ({ nocList: propNocList }) => {
  const [nocList, setNocList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (propNocList && propNocList.length > 0) {
      setNocList(propNocList);
    } else {
      setNocList([
        {
          typeOfProject: "Feature Film",
          duration: "3 Months",
          title: "The Journey of Bihar",
          genre: "Drama",
          representative: "Ravi Kumar",
          email: "ravi@example.com",
          startDate: "2025-09-15",
          endDate: "2025-12-15",
          status: "Accepted",
        },
        {
          typeOfProject: "Documentary",
          duration: "1 Month",
          title: "Culture of Mithila",
          genre: "Documentary",
          representative: "Anjali Singh",
          email: "anjali@example.com",
          startDate: "2025-10-01",
          endDate: "2025-10-30",
          status: "Pending",
        },
        {
          typeOfProject: "Short Film",
          duration: "15 Days",
          title: "Life in Patna",
          genre: "Drama",
          representative: "Saurabh Das",
          email: "saurabh@example.com",
          startDate: "2025-11-05",
          endDate: "2025-11-20",
          status: "Rejected",
        },
      ]);
    }
  }, [propNocList]);

  const filteredAndSortedData = useMemo(() => {
    let filtered = nocList.filter(noc => {
      const matchesSearch = Object.values(noc).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = filterStatus === "All" || noc.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [nocList, searchTerm, sortConfig, filterStatus]);

  const handleSort = useCallback((key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <FaSort className="w-3 h-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="w-3 h-3 text-[#a92b4e]" /> : 
      <FaSortDown className="w-3 h-3 text-[#a92b4e]" />;
  };

  const stats = useMemo(() => {
    const total = nocList.length;
    const accepted = nocList.filter(noc => noc.status === "Accepted").length;
    const rejected = nocList.filter(noc => noc.status === "Rejected").length;
    const pending = nocList.filter(noc => noc.status === "Pending").length;
    
    return { total, accepted, rejected, pending };
  }, [nocList]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date) ? "N/A" : date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // PDF Download Functions
  const downloadAllPdf = useCallback(() => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Filmmaker NOC Applications", 14, 22);

    const headers = ["Sr. No", "Type", "Duration", "Title", "Genre", "Representative", "Email", "Start Date", "End Date", "Status"];
    
    const data = filteredAndSortedData.map((noc, index) => [
      `${index + 1}`,
      noc.typeOfProject,
      noc.duration,
      noc.title,
      noc.genre,
      noc.representative,
      noc.email,
      formatDate(noc.startDate),
      formatDate(noc.endDate),
      noc.status
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 35,
      headStyles: { 
        fillColor: [169, 43, 78],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [248, 249, 250] },
      margin: { left: 14, right: 14 },
      styles: { 
        fontSize: 8,
        cellPadding: 3
      },
      columnStyles: {
        0: {cellWidth: 15}, // Sr. No
        1: {cellWidth: 20}, // Type
        2: {cellWidth: 18}, // Duration
        3: {cellWidth: 30}, // Title
        4: {cellWidth: 18}, // Genre
        5: {cellWidth: 25}, // Representative
        6: {cellWidth: 35}, // Email
        7: {cellWidth: 20}, // Start Date
        8: {cellWidth: 20}, // End Date
        9: {cellWidth: 18}, // Status
      }
    });

    doc.save("all_noc_applications.pdf");
  }, [filteredAndSortedData, formatDate]);

  const downloadSinglePdf = useCallback((noc, index) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("NOC Application Details", 14, 22);

    const data = [
      ["Serial Number", `${index + 1}`],
      ["Project Type", noc.typeOfProject],
      ["Duration", noc.duration],
      ["Title", noc.title],
      ["Genre", noc.genre],
      ["Representative", noc.representative],
      ["Email", noc.email],
      ["Start Date", formatDate(noc.startDate)],
      ["End Date", formatDate(noc.endDate)],
      ["Status", noc.status]
    ];

    doc.autoTable({
      body: data,
      startY: 35,
      theme: 'grid',
      styles: { 
        fontSize: 12,
        cellPadding: 5
      },
      columnStyles: {
        0: {
          fontStyle: 'bold',
          fillColor: [169, 43, 78],
          textColor: 255,
          cellWidth: 50
        },
        1: {
          cellWidth: 120
        }
      }
    });

    doc.save(`noc_${noc.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  }, [formatDate]);

  const statsCards = [
    {
      title: "Total Applied",
      value: stats.total,
      subtitle: "All-time NOCs",
      icon: <FaFolderOpen />,
      isHighlight: true
    },
    {
      title: "Accepted",
      value: stats.accepted,
      subtitle: "Approved NOCs",
      icon: <FaCheckCircle />
    },
    {
      title: "Pending",
      value: stats.pending,
      subtitle: "Under Review",
      icon: <FaClock />
    },
    {
      title: "Rejected",
      value: stats.rejected,
      subtitle: "Declined NOCs",
      icon: <FaTimesCircle />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Filmmaker Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your NOC applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search NOCs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-[#a92b4e] text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#a92b4e] focus:border-[#a92b4e] text-sm bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                {filteredAndSortedData.length} of {nocList.length}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#a92b4e] to-[#8a2340]">
            <h2 className="text-lg font-medium text-white">NOC Applications</h2>
          </div>

          {filteredAndSortedData.length === 0 ? (
            <div className="text-center py-12">
              <FaFolderOpen className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No NOCs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { key: 'sr', label: 'No.', width: 'w-16', sortable: false },
                      { key: 'typeOfProject', label: 'Type', width: 'w-32', sortable: false },
                      { key: 'duration', label: 'Duration', width: 'w-24', sortable: false },
                      { key: 'title', label: 'Project', width: 'min-w-48', sortable: false },
                      { key: 'representative', label: 'Representative', width: 'min-w-48', sortable: false },
                      { key: 'startDate', label: 'Start', width: 'w-28', sortable: false },
                      { key: 'endDate', label: 'End', width: 'w-28', sortable: false },
                      { key: 'status', label: 'Status', width: 'w-32', sortable: false },
                      { key: 'actions', label: 'Actions', width: 'w-24', sortable: false },
                    ].map((column) => (
                      <th
                        key={column.key}
                        className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width} ${
                          column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                        }`}
                        onClick={() => column.sortable && handleSort(column.key)}
                      >
                        <div className="flex items-center gap-1">
                          {column.label}
                          {column.sortable && getSortIcon(column.key)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedData.map((noc, index) => (
                    <TableRow
                      key={index}
                      noc={noc}
                      index={index}
                      formatDate={formatDate}
                      onDownloadSingle={downloadSinglePdf}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmmakerOverview;
