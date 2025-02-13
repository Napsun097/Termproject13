import React from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");

  return (
    <div>
      <h2>ผลลัพธ์การค้นหา: "{query}"</h2>
      {/* โค้ดสำหรับดึงข้อมูลผลลัพธ์จาก API และแสดงผล */}
    </div>
  );
}

export default SearchResults;
