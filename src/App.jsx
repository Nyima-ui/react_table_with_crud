import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const [tableNumber, setTableNumber] = useState(1); 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
    const paginate = () => {
      console.log('new table needed'); 
      setTableData((prev) => prev + 1); 
      const rowsPerTable = 5; 
      
      const indexofLastObj = rowsPerTable * tableNumber
      const indexofFirstObj = indexofLastObj - rowsPerTable;  

      const tables = Math.ceil(tableData.length / rowsPerTable); 
    }
  
  const addDataToTable = (e) => {
    e.preventDefault();
    setTableData((prev) => [...prev, formData]);
    setFormData({ name: "", gender: "", age: "" });
    tableData.length > 4 ? paginate() : ""; 
  };
  


  useEffect(() => {
    console.log(tableData);
  }, [tableData]);
  return (
    <>
      <form onSubmit={addDataToTable}>
        <input
          type="text"
          placeholder="Name"
          className="border m-5"
          onChange={handleChange}
          name="name"
          value={formData.name}
          required
        />
        <input
          type="text"
          placeholder="Gender"
          className="border m-5"
          onChange={handleChange}
          name="gender"
          value={formData.gender}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="border m-5"
          onChange={handleChange}
          name="age"
          value={formData.age}
          required
        />
        <button
          className="bg-indigo-600 text-white px-4 py-1 rounded-md block ml-50 cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </form>

      <input type="text" placeholder="Search" className="border m-5" />

      <table className="border mx-5 mt-2">
        {/* heading row  */}
        <thead>
          <tr className="border">
            <th className="border px-6">Name</th>
            <th className="border px-6">Gender</th>
            <th className="border px-6">Age</th>
            <th className="border px-6">Action</th>
          </tr>
        </thead>
        {/* second row  */}
        <tbody>
          {tableData.map((data,index) => (
            <tr key={index}>
              <td className="border px-6 py-1">{data.name}</td>
              <td className="border px-6">{data.gender}</td>
              <td className="border px-6">{data.age}</td>
              <td className="border px-6">
                <button className="border bg-red-500 mx-2 text-white px-2 cursor-pointer">
                  Edit
                </button>
                <button className="border bg-green-500 mx-2 text-white px-2 cursor-pointer">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bg-green-500 text-white px-4 py-1 rounded-md block ml-50 mt-3 cursor-pointer">
        1
      </button>
    </>
  );
}

export default App;
