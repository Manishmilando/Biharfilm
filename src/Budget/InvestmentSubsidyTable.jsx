import React from 'react';

const InvestmentSubsidyTable = () => {
  const subsidyData = [
    {
      purpose: 'Studio / Film City / Tech Setup',
      minInvestment: '₹200 lakh',
      subsidyPercent: '25%',
      maxSubsidy: '₹150 lakh',
    },
    {
      purpose: 'Film Lighting / Equipment Rental',
      minInvestment: '₹100 lakh',
      subsidyPercent: '25%',
      maxSubsidy: '₹100 lakh',
    },
    {
      purpose: 'Full-fledged Studio Setup',
      minInvestment: '₹50 lakh',
      subsidyPercent: '25%',
      maxSubsidy: '₹25 lakh',
    },
    {
      purpose: 'Animation Lab, Editing Suite, Tech Setup',
      minInvestment: '₹50 lakh',
      subsidyPercent: '25%',
      maxSubsidy: '₹25 lakh',
    },
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Purpose</th>
            <th className="p-3 border">Min Investment (₹ lakh)</th>
            <th className="p-3 border">Subsidy %</th>
            <th className="p-3 border">Max Subsidy (₹ lakh)</th>
          </tr>
        </thead>
        <tbody>
          {subsidyData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border">{item.purpose}</td>
              <td className="p-3 border">{item.minInvestment}</td>
              <td className="p-3 border">{item.subsidyPercent}</td>
              <td className="p-3 border">{item.maxSubsidy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentSubsidyTable;
