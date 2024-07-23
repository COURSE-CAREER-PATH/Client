import React, { useEffect, useState } from 'react'
import Selector from './Selector'
import { Country, State, City} from 'country-state-city'
import { Input } from '../../Buttons';

const CountriesList = () => {
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
        <form className='px-3  '>
           <div className="">
           <h2 className='text-2xl font-Ubuntu text-neutral-400 text-center'>
                Residence
            </h2>
            <br />
            <div className="flex flex-col flex-wrap md:flex-row gap-3  rounded-lg p-3">
                <div className="flex items-center justify-between">
                <p className="font-semi-bold">
                    Countries:
                </p>
                <Selector data={countryData} selected={country} setSelected={setCountry}/>
                </div>
               {state && (
                 <div className="flex items-center justify-between">
                 <p className="font-semi-bold">
                     State:
                 </p>
                 <Selector data={stateData} selected={state} setSelected={setState}/>
                 </div>
               )}
                {
                    city && (
                        <div className="flex items-center justify-between">
                <p className="font-semi-bold">
                    City:
                </p>
                <Selector data={cityData} selected={city} setSelected={setCity}/>
                </div>
                    )
                }
            </div>
            <div className="flex flex-col w-full md:w-auto md:items-center md:text-center">
                <p className="font-semi-bold pb-2">
                  Aditional  Address:
                </p>
                    <Input Labelvalue={'Additional address'} width={'full'} />
                <p className="font-semi-bold py-2">
                    Zip Code:
                </p>
                    <Input Labelvalue={'Zip Code'} width={'full'} Number={'number'}/>
                </div>
           </div>
        </form>
    </div>
  )
}

export default CountriesList