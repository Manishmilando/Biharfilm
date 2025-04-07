import React from 'react';

const InvestmentSubsidyTable = () => {
  const data = [
    { costRange: 'Up to ₹50 lakhs', subsidy: '25%', screeningDays: 'Minimum 45 days' },
    { costRange: 'Up to ₹1 crore', subsidy: '25%', screeningDays: 'Minimum 90 days' },
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Cost Range</th>
            <th className="p-3 border">Subsidy</th>
            <th className="p-3 border">Screening Days in Bihar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-3 border">{row.costRange}</td>
              <td className="p-3 border">{row.subsidy}</td>
              <td className="p-3 border">{row.screeningDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentSubsidyTable;
