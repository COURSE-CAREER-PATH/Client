import React from 'react';
import { useGlobalState } from './GlobalStateProvider';
const CompanySizeSelector = () => {
  const { formData, setFormData } = useGlobalState();

  const handleCompanySizeChange = (event) => {
    const selectedSize = event.target.value;
    setFormData({
      ...formData,
      companySize: selectedSize,
    });
  };

  return (
    <div className="w-full text-start">
      <label className="block text-sm font-medium text-gray-200" htmlFor="company-size">
        Company Size
      </label>
      <div className="relative mt-2">
        <select
          id="company-size"
          value={formData.companySize} // Bind the selected value to the state
          onChange={handleCompanySizeChange} // Handle change event
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-900 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
        >
          <option value="" disabled>Select company size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501-1000">501-1000 employees</option>
          <option value="1001+">1001+ employees</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M7 10l5 5 5-5H7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompanySizeSelector;
