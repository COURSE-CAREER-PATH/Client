import React from 'react'
import { Buttons, ButtonsTwo, Input, TextArea } from '../../../Buttons'
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa'
import { IoIosLink } from 'react-icons/io'
import { BsTwitterX } from 'react-icons/bs'
import { LinkedinIcon } from 'lucide-react'
import { useGlobalState } from '../GlobalStateProvider'
import CompanySizeSelector from '../CompanySizeSelector'
const EditEmployerInfo = () => {
    const { formData, setFormData, saveDataToFirestore, updateFormData } =
    useGlobalState();
    const handleInputChange = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const linkDivs = `flex items-center gap-x-3 mx-2 text-2xl`;

  return (
    <div>
                  <div
            className="w-[100%] mx-auto flex flex-col h-auto text-center px-5 md:px-16"
           
          >
            <div className="w-full lg:w-1/2 mx-auto  gap-y-3 flex flex-col">
              <h1 className="text-3xl font-bold mt-5">Info As Client</h1>
              <div className="flex flex-col gap-4">
                <div className="">
                  <h1 className="text-sm text-start ">Company Name</h1>
                  <Input
                    Labelvalue={"Company Name"}
                    width={"full"}
                    value={formData.companyName}
                    onChange={(value) =>
                      handleInputChange("companyName", value)
                    }
                  />
                </div>

                <div className="">
                  <h1 className="text-sm text-start">Company Position</h1>
                  <Input
                    Labelvalue={"Company Position"}
                    width={"full"}
                    value={formData.companyPosition}
                    onChange={(value) =>
                      handleInputChange("companyPosition", value)
                    }
                  />
                </div>
              </div>
              <div className="">
                <CompanySizeSelector/>
              </div>
              <div className="">
                <h1 className="text-sm text-start">Company Address</h1>
                <TextArea
                  labelValue={"Company Address"}
                  value={formData.companyAddress}
                  onChange={(value) =>
                    handleInputChange("companyAddress", value)
                  }
                />
              </div>
              <div className="">
                <h1 className="text-sm text-start">Company Description</h1>
                <TextArea
                  labelValue={"Company Description"}
                  value={formData.companyDescription}
                  onChange={(value) =>
                    handleInputChange("companyDescription", value)
                  }
                />
              </div>
              <div className="my-10 mx-auto ">
                <h1 className="text-center mb-2">Links</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 mx-auto">
                  <div className={linkDivs}>
                    <LinkedinIcon />
                    <Input
                      Labelvalue={"LinkedIn"}
                      value={formData.companyLinkedIn}
                      onChange={(value) =>
                        handleInputChange("companyLinkedIn", value)
                      }
                    />
                  </div>
                  <div className={linkDivs}>
                    <FaFacebook />
                    <Input
                      Labelvalue={"Facebook"}
                      value={formData.companyFacebook}
                      onChange={(value) =>
                        handleInputChange("companyFacebook", value)
                      }
                    />
                  </div>
                  <div className={linkDivs}>
                    <BsTwitterX />
                    <Input
                      Labelvalue={"Twitter"}
                      value={formData.companyTwitter}
                      onChange={(value) =>
                        handleInputChange("companyTwitter", value)
                      }
                    />
                  </div>
                  <div className={linkDivs}>
                    <IoIosLink />
                    <Input
                      Labelvalue={"Website"}
                      value={formData.companyWebsite}
                      onChange={(value) =>
                        handleInputChange("companyWebsite", value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className="text-center mb-2">Phone</h1>
                <div className="grid grid-cols-12 items-center">
                  <FaPhoneAlt />
                  <div className="col-span-11">
                    <Input
                      Labelvalue={"Phone"}
                      value={formData.companyPhone}
                      onChange={(value) =>
                        handleInputChange("companyPhone", value)
                      }
                      Number={"Number"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default EditEmployerInfo