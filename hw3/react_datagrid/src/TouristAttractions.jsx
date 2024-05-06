import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";

function TouristAttractions() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
      );
      const json = await response.json();
      setData(
        json.map((item) => ({
          id: item.UID, // 确保每行数据有一个唯一的 id
          title: item.title,
          location:
            item.showInfo.length > 0 ? item.showInfo[0].location : "未提供地點",
          price:
            item.showInfo.length > 0 ? item.showInfo[0].price : "未提供票價",
        }))
      );
    };
    fetchData();
  }, []);

  const columns = [
    { field: "title", headerName: "名稱", width:200 ,},
    { field: "location", headerName: "地點", width: 250 },
    { field: "price", headerName: "票價", width: 500 },
  ];

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div style={{height: "90vh", width: "100%" }}>
      <TextField
        fullWidth
        label="搜索"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        
      />
      <DataGrid
        rows={filteredData}
        columns={columns}
         initialState={{
          pagination: {
             paginationModel: { pageSize: 10 },
           },
         }}
         pageSizeOptions={[10,100]}
      />
    </div>
  );
}

export default TouristAttractions;
