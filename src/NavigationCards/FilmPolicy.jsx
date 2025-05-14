import React from "react";
import Reelfilm from "../assets/Reelfilm.svg";
import FilmSubsidyTable from "../Budget/value.jsx";
import InvestmentSubsidyTable from "../Budget/InvestmentSubsidyTable.jsx";
import FilmSubsidy from "../Budget/FilmSubsidy.jsx";


export default function FilmPolicyNOC() {
  return (
    <div className="min-h-screen w-full bg-white px-4 xl:px-16 py-10">
      {/* Tables side by side on large screens, stacked on small */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <FilmSubsidyTable />
        <InvestmentSubsidyTable />
      </div>

      {/* Extra FilmSubsidy component for small screens */}
      <div className="xl:hidden mt-10">
        <FilmSubsidy />
      </div>

      

    </div>
  );
}
