import React from "react";
import "../styles/TabBar.css";

function TabBar({ activeTab, setActiveTab }) {
  const tablist = ["Movies", "Series"];

  return (
    <div className="tabBar">
      {tablist.map((tabName) => (
        <div
          key={tabName}
          className={activeTab === tabName ? "tab active" : "tab"}
          onClick={() => setActiveTab(tabName)}
        >
          {tabName}
        </div>
      ))}
    </div>
  );
}

export default TabBar;
