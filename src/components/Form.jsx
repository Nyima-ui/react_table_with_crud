import React from "react";

const Form = ({handleChange, handleSubmit, formData}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        className="border m-5 bg-white"
        onChange={handleChange}
        name="name"
        value={formData.name}
        required
      />
      <input
        type="text"
        placeholder="Gender"
        className="border m-5 bg-white"
        onChange={handleChange}
        name="gender"
        value={formData.gender}
        required
      />
      <input
        type="number"
        placeholder="Age"
        className="border m-5 bg-white"
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
  );
};

export default Form;
