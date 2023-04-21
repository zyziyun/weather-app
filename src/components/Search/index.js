import { useMemo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from '@mui/material/utils';
import { fetchGeoPlaces } from '../../services/geocoding';

export default function Search({ onSearch }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const fetch = useMemo(() => debounce((name, callback) => {
    fetchGeoPlaces(name).then((data) => callback(data))
  }, 200),[]);

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      return;
    }
    fetch(inputValue, (options) => {
      setOptions(options)
    });
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      id="search"
      sx={{ width: 800, margin: '0 auto' }}
      options={options}
      value={value}
      noOptionsText="Loading...Please input name"
      disableClearable={true}
      clearOnBlur={false}
      onChange={(event, selected) => {
        if (!selected) {
          setValue('');
          return;
        }
        onSearch(selected)
      }}
      getOptionLabel={(option) => option.title}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Please search your city" fullWidth />
      )}
    />
  );
}
