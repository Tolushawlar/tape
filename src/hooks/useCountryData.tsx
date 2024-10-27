import {
  ICountry,
  IState,
  ICity,
  Country,
  State,
  City,
} from "country-state-city";
import { useState, useEffect } from "react";

export const useCountryData = (
  selectedCountry: string,
  selectedState: string
) => {
  const [countries, setCountries] = useState<ICountry[]>(
    Country.getAllCountries()
  );
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
    } else {
      setStates([]);
    }
    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  return { countries, states, cities };
};
