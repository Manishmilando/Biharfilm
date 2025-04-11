import React from 'react';

const FilmSubsidyTable = () => {
  const filmData = [
    {
      filmNo: '1st Film',
      ranges: [
        { cost: 'Up to ₹2 Cr', subsidy: '25%', days: '50% of shooting days' },
        { cost: '₹2–₹5 Cr', subsidy: '25%', days: '75% of shooting days' },
      ],
    },
    {
      filmNo: '2nd Film',
      ranges: [
        { cost: '₹2–₹7.5 Cr', subsidy: '25%', days: '50% of shooting days' },
        { cost: '₹3–₹10 Cr', subsidy: '25%', days: '75% of shooting days' },
      ],
    },
    {
      filmNo: '3rd Film',
      ranges: [
        { cost: '₹3.5–₹15 Cr', subsidy: '25%', days: '50% of shooting days' },
        { cost: '₹4–₹20 Cr', subsidy: '25%', days: '75% of shooting days' },
      ],
    },
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-[35 rem] text-sm text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Film No.</th>
            <th className="p-3 border">Film Cost Range</th>
            <th className="p-3 border">% of Cost Subsidy</th>
            <th className="p-3 border">Minimum Screening Days (in Bihar)</th>
          </tr>
        </thead>
        <tbody>
          {filmData.map((film, index) =>
            film.ranges.map((range, i) => (
              <tr key={`${index}-${i}`} className="hover:bg-gray-50">
                {i === 0 && (
                  <td
                    rowSpan={film.ranges.length}
                    className="p-3 border font-medium bg-gray-50"
                  >
                    {film.filmNo}
                  </td>
                )}
                <td className="p-3 border">{range.cost}</td>
                <td className="p-3 border">{range.subsidy}</td>
                <td className="p-3 border">{range.days}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilmSubsidyTable;