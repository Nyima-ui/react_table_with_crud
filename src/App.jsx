import { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Form from "./components/Form";

function App() {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const ROWS_PER_TABLE = 5;
  const totalPages = Math.ceil(tableData.length / ROWS_PER_TABLE);

  const currentPageData = tableData.slice(
    (currentPage - 1) * ROWS_PER_TABLE,
    currentPage * ROWS_PER_TABLE
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gender || !formData.age) return;
    setTableData((prev) => [...prev, formData]);
    setFormData({ name: "", gender: "", age: "" });
    setCurrentPage(Math.ceil((tableData.length + 1) / ROWS_PER_TABLE));
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("tableData");
      if (storedData) {
        setTableData(JSON.parse(storedData));
      }
    } catch (error) {
      console.log("Failed to load data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);
  return (
    <>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <Table
        totalPages={totalPages}
        currentPage={currentPage}
        currentPageData={currentPageData}
        setCurrentPage={setCurrentPage}
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
}

export default App;
