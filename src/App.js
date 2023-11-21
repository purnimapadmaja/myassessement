import React, { useState } from "react";
import { Table, Input, Checkbox, Button, Select } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const App = () => {
  const [dataSource] = useState([
    { _id: 1, name: "John Doe", trips: 5, gender: "Male" },
    { _id: 2, name: "Jane Smith", trips: 8, gender: "Male" },
    { _id: 3, name: "Purnima", trips: 11, gender: "FeMale" },
    { _id: 4, name: "Abhi", trips: 8, gender: "FeMale" },
    { _id: 5, name: "Janaki", trips: 314, gender: "FeMale" },
    { _id: 6, name: "Valli", trips: 108, gender: "FeMale" },
    { _id: 7, name: "Tulasi", trips: 198, gender: "FeMale" },
    { _id: 8, name: "Alekhya", trips: 138, gender: "FeMale" },
    { _id: 9, name: "Chandu", trips: 348, gender: "Male" },
    { _id: 10, name: "Shruti", trips: 380, gender: "FeMale" },
    { _id: 11, name: "Vanaja", trips: 386, gender: "FeMale" },
    { _id: 12, name: "Tanuja", trips: 388, gender: "FeMale" },
    { _id: 13, name: "Lakshmi", trips: 389, gender: "FeMale" },
    { _id: 14, name: "Tripura", trips: 1038, gender: "FeMale" },
    { _id: 14, name: "Triandh", trips: 1038, gender: "Male" },
    { _id: 15, name: "Teja", trips: 383, gender: "FeMale" },
    { _id: 16, name: "Vamsi", trips: 398, gender: "FeMale" },
    { _id: 17, name: "Jaya", trips: 378, gender: "FeMale" },
    { _id: 18, name: "Juhithi", trips: 358, gender: "FeMale" },
    { _id: 19, name: "Iyansh", trips: 348, gender: "Male" },
    { _id: 20, name: "Mohan", trips: 328, gender: "Male" },
    { _id: 21, name: "Prakruth", trips: 318, gender: "Male" },
    { _id: 22, name: "Nancy", trips: 28, gender: "FeMale" },
    { _id: 23, name: "Nayani", trips: 638, gender: "FeMale" },
    { _id: 24, name: "Narmada", trips: 438, gender: "FeMale" },
    { _id: 25, name: "Sindu", trips: 238, gender: "FeMale" },
  ]);

  const [filteredDataSource, setFilteredDataSource] = useState(dataSource);
  const [searchText, setSearchText] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: 100,
      resizable: true,
      visible: !hiddenColumns.includes("_id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      filterIcon: <SearchOutlined />,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <button onClick={() => clearFilters()}>Reset</button>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
      resizable: true,
    },
    {
      title: "Trips",
      dataIndex: "trips",
      sorter: (a, b) => a.trips - b.trips,
      width: 100, // Initial column width
      resizable: true, // Allow column resizing
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "FeMale", value: "FeMale" },
      ],
      onFilter: (value, record) => record.gender === value,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.columnKey) {
      const sortedData = [...filteredDataSource].sort((a, b) => {
        if (sorter.order === "ascend") {
          return a[sorter.columnKey] - b[sorter.columnKey];
        } else {
          return b[sorter.columnKey] - a[sorter.columnKey];
        }
      });
      setFilteredDataSource(sortedData);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, selectedGender);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
    filterData(searchText, value);
  };

  const toggleColumnVisibility = (columnKey) => {
    setHiddenColumns((prevHiddenColumns) =>
      prevHiddenColumns.includes(columnKey)
        ? prevHiddenColumns.filter((key) => key !== columnKey)
        : [...prevHiddenColumns, columnKey]
    );
  };

  const filterData = (search, gender) => {
    let filteredData = [...dataSource];

    if (search) {
      filteredData = filteredData.filter((record) =>
        record.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (gender) {
      filteredData = filteredData.filter((record) => record.gender === gender);
    }

    setFilteredDataSource(filteredData);
  };

  const resizableColumns = columns.map((col) => ({
    ...col,
    onHeaderRow: (column) => ({
      width: col.width,
      onResize: (width) => {
        const newColumns = [...columns];
        const index = newColumns.findIndex(
          (c) => c.dataIndex === column.dataIndex
        );
        newColumns[index].width = width;
      },
    }),
  }));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Input
        placeholder="Search the table"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />

      <Select
        placeholder="Select Gender"
        style={{ width: 120, marginBottom: 16 }}
        onChange={handleGenderChange}
        value={selectedGender}
      >
        <Option value="Male">Male</Option>
        <Option value="FeMale">Female</Option>
      </Select>

      <Button
        onClick={() => toggleColumnVisibility("_id")}
        icon={
          hiddenColumns.includes("_id") ? (
            <EyeInvisibleOutlined />
          ) : (
            <EyeOutlined />
          )
        }
      >
        {hiddenColumns.includes("_id") ? "Show ID Column" : "Hide ID Column"}
      </Button>

      <Table
        columns={resizableColumns.filter(
          (col) => !hiddenColumns.includes(col.dataIndex)
        )}
        dataSource={filteredDataSource}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default App;
