import React, { useState } from 'react';
import Select from 'react-select';
import { jobOptions } from '../../index'; // Adjust the path as necessary
import { useGlobalState } from './GlobalStateProvider';

const MultiSelectDropdown = () => {
    const { formData, setFormData } = useGlobalState();
    const [selectedOptions, setSelectedOptions] = useState(formData.Jobs || []);

    const handleChange = (selected) => {
        const updatedOptions = selected || [];
        setSelectedOptions(updatedOptions);
        
        // Update the array in formData
        setFormData((prevFormData) => ({
            ...prevFormData,
            Jobs: updatedOptions, // Store the selected options array in formData
        }));
    };

    // Filter out selected options from the available options
    const availableOptions = jobOptions.filter(
        option => !selectedOptions.some(selected => selected.value === option.value)
    );

    return (
        <div className='text-neutral-900'>
            <Select 
                className=''
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                options={availableOptions} // Use the filtered options array
                placeholder="Select options..."
            />
        </div>
    );
};

export default MultiSelectDropdown;
