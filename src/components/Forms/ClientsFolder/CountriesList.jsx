import React, { useEffect, useState } from 'react'
import Selector from './Selector'
import { Country, State, City} from 'country-state-city'

const CountriesList = ({userCountry, userState, userCity}) => {
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState()
    const [cityData, setCityData] = useState()

    const [country, setCountry] = useState(countryData[0]);
    const [state, setState] = useState();
    const [city, setCity] = useState();


    useEffect(()=>{
        setStateData(State.getStatesOfCountry(country?.isoCode))
    }, [country]);

    useEffect(()=>{
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode))
    }, [state]);

    useEffect(()=>{
    stateData && setState(stateData[0])
    }, [stateData]);

    useEffect(()=>{
    cityData && setCity(cityData[0])
    }, [cityData])
  return (
    <div>
        <div className='px-3  '>
           <div className="">
           <h2 className='text-2xl font-Ubuntu text-neutral-400 text-center'>
                Residence
            </h2>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between">
                <p className="font-semi-bold">
                    Countries:
                </p>
                <Selector data={countryData} selected={country} setSelected={setCountry} userCountry={userCountry}/>
                </div>
               {state && (
                 <div className="flex items-center justify-between">
                 <p className="font-semi-bold">
                     State:
                 </p>
                 <Selector data={stateData} selected={state} setSelected={setState} userState={userState}/>
                 </div>
               )}
                {
                    city && (
                        <div className="flex items-center justify-between">
                <p className="font-semi-bold">
                    City:
                </p>
                <Selector data={cityData} selected={city} setSelected={setCity} userCity={userCity}/>
                </div>
                    )
                }
            </div>
           </div>
        </div>
    </div>
  )
}

export default CountriesList