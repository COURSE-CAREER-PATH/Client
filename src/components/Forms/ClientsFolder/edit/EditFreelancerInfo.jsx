import React from 'react'
import { Buttons, Input, TextArea } from '../../../Buttons'
import PortfolioLinks from '../Portfolio/PortFolioLinks'
import MultiSelectDropdown from '../MultiSelectDropdown'
import { useGlobalState } from '../GlobalStateProvider'

const EditFreelancerInfo = () => {
  const { formData, setFormData, saveDataToFirestore, updateFormData } =
  useGlobalState();
    const handleInputChange = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  return (
    <div>
        <div className=" mx-auto flex flex-col h-auto text-center px-5 md:px-16">
            <div className="gap-10 flex flex-col capitalize text-center">
              <h1 className="text-center my-10 mb-5 text-3xl ">
                More Information
              </h1>
              <div className="w-full lg:w-1/2 mx-auto  gap-y-3 flex flex-col text-start">
                <p className="pb-4">What Is Your Dominant Profession</p>
                <Input
                  Labelvalue={"Profession"}
                  width={"full"}
                  value={formData.Profession}
                  onChange={(value) => handleInputChange("Profession", value)}
                />
              </div>
              <div className="md:w-1/2 w-full mx-auto text-start">
                <p className="pb-4 ">work history and experience overview</p>
                <TextArea
                  labelValue={"Overview"}
                  value={formData.Overview}
                  onChange={(value) => handleInputChange("Overview", value)}
                />
              </div>

              <div className="md:w-1/2 mx-auto text-start">
                <p>List of skill set you can offer</p>
                <MultiSelectDropdown />
              </div>
              <div className="w-[60%] mx-auto ">
                <h1 className="pb-10 ">Project Links</h1>
                <PortfolioLinks />
              </div>
            </div>
          </div>
    </div>
  )
}

export default EditFreelancerInfo