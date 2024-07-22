import React from 'react'
import Clientsprofiledetails from './Clientsprofiledetails'
import ClientspersonalInfo from './ClientspersonalInfo'

const ClientApp = () => {
  return (
    <>
    <div className="flex flex-col">
    <ClientspersonalInfo/>
    <Clientsprofiledetails/>
    </div>
    </>
  )
}

export default ClientApp