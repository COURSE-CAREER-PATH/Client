import React,{useEffect} from 'react'
import Clientsprofiledetails from './Clientsprofiledetails'
import ClientspersonalInfo from './ClientspersonalInfo'
import { useLocation, useNavigate } from 'react-router'


const ClientApp = () => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(()=>{
        if(location.hash){
            const element = document.getElementById(location.hash.substring(1));
            if (element){
                element.scrollIntoView({behavior: 'smooth'});
            }
        }
    }, [location])
    const handleScroll = (id)=>{
        navigate(`#${id}`)
    }
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