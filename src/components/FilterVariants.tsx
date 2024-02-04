import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface FilterVariantsProps {
  handler: (value: string) => void;
  filters: string[];
  filterName: string;
  filterLabel: string;
}

const FilterVariants: React.FC<FilterVariantsProps> = ({handler, filters, filterName, filterLabel}) => {
  const [filter, setFilter] = React.useState("")
  
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
    handler(event.target.value)
  };
  
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="standard-label">{filterName || "Filter name"}</InputLabel>
        <Select
          labelId="standard-label"
          value={filter}
          onChange={handleChange}
          label={filterLabel || "Filter label"}
        >
          <MenuItem value="">
            {filter ? <em>Clean filter</em> : <em>Select filter</em>}
          </MenuItem>
          {
            filters?.map((element:string) => (
              <MenuItem key={element} value={element}>{element}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterVariants;

