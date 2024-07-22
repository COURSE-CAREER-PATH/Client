import { Buttons, Input } from '../../Buttons'
import CountriesList from './CountriesList'
import Clientsprofiledetails from './Clientsprofiledetails'

const Sectionheader = 'text-center pb-2'

const ClientspersonalInfo = () => {
  return (
    <div className="">
    <div className='flex flex-col w-[90%] border border-purple-700 rounded-3xl mx-auto py-2 mt-2 px-5'>
      <h1 className='text-3xl font-Ubuntu text-neutral-400 text-center mb-10'>
        Personal Information
      </h1>
      <form className="flex flex-col gap-4 items-center">
        <section className="w-full md:w-auto">
          <h1 className={Sectionheader}>
            First Name
          </h1>
          <Input Labelvalue={'First Name'} />
        </section>
        <section className="w-full md:w-auto">
          <h1 className={Sectionheader}>
            Middle Name
          </h1>
          <Input Labelvalue={'Middle name'} />
        </section>
        <section className='w-full md:w-auto md:mb-0'>
          <h1 className={Sectionheader}>
            Last Name
          </h1>
          <Input Labelvalue={'Last name'} />
        </section>
        <section className='w-full md:w-auto mb-10 md:mb-0'>
          <h1 className={Sectionheader}>
            Mobile Number
          </h1>
          <Input Labelvalue={'Mobile Number'} Number={'number'} />
        </section>
        <CountriesList/>
        <Buttons value={'Next'} />
      </form>
    </div>
    </div>
  )
}

export default ClientspersonalInfo
