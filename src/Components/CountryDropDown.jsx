import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const CountryRegionSelector = ({country,setCountry}) => {
  // const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const selectCountry = (val) => {
    setCountry(val);
     console.log(val);
  };

  const selectRegion = (val) => {
    setRegion(val);
  };

  return (
    <div>
      <CountryDropdown
      valueType="short"
        value={country}
        onChange={(val) => selectCountry(val)}
        style={{ width: '100%', height: '47px' }}
      />
      {/* <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => selectRegion(val)}
      /> */}
    </div>
  );
};

export default CountryRegionSelector;
