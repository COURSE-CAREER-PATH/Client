import React, { useState } from 'react';
import Select from 'react-select';
import { jobOptions } from '../../index'; // Adjust the path as necessary

const MultiSelectDropdown = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    // Filter out selected options from the available options
    const availableOptions = jobOptions.filter(
        option => !selectedOptions.some(selected => selected.value === option.value)
    );

    return (
        <div className='text-neutral-900'>
            <Select
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                options={availableOptions} // Use the filtered options array
                placeholder="Select options..."
            />
            <div style={{ marginTop: '10px' }}>
                {selectedOptions.map(option => (
                    <div key={option.value} className='border rounded-full border-purple-700 text-neutral-300 px-3 py-2 inline-block m-1 hover:text-neutral-500 transition'>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
