import React, { useEffect, useState } from 'react';
import Selector from './Selector';
import { Country, State, City } from 'country-state-city';
import { useGlobalState } from './GlobalStateProvider';

const CountriesList = () => {
  const { formData, setFormData } = useGlobalState();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
    handleInputChange('country', country?.name);
    setState(undefined); // Reset state when country changes
    setCity(undefined); // Reset city when country changes
  }, [country]);

  useEffect(() => {
    if (state) {
      setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
      handleInputChange('state', state?.name);
      setCity(undefined); // Reset city when state changes
    } else {
      setCityData([]);
    }
  }, [state]);

  useEffect(() => {
    if (city) {
      handleInputChange('city', city?.name);
    }
  }, [city]);

  useEffect(() => {
    if (stateData.length) {
      setState(stateData[0]);
    }
  }, [stateData]);

  useEffect(() => {
    if (cityData.length) {
      setCity(cityData[0]);
    }
  }, [cityData]);

  return (
    <div>
      <div className='px-3'>
        <div className="">
          <h2 className='text-2xl font-Ubuntu text-neutral-400 text-center'>
            Residence
          </h2>
          <br />
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            <div className="flex items-center justify-between">
              <p className="font-semi-bold">
                Countries:
              </p>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            {state && (
              <div className="flex items-center justify-between">
                <p className="font-semi-bold">
                  State:
                </p>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {city && (
              <div className="flex items-center justify-between">
                <p className="font-semi-bold">
                  City:
                </p>
                <Selector
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesList;
