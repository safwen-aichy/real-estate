import React, { useState } from 'react';
import { Paper, Box, InputLabel, MenuItem, Select, FormControl, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';



function Searchbar() {
  const [propertyPurpose, setPropertyPurpose] = useState('Residential Sale');
  const [propertyType, setPropertyType] = useState('');
  const [bedCount, setBedCount] = useState('Any beds');
  const [expanded, setExpanded] = useState(false); 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [areaSize, setAreaSize] = useState('');

  const residentialTypes = ['Apartment', 'Duplex', 'Hotel Apartment', 'Penthouse', 'Studio', 'Villa'];
  const commercialTypes = ['Office', 'Warehouse', 'Retail'];
  const minPrices = ['250,000 AED', '300,000 AED', '350,000 AED', '400,000 AED', '450,000 AED'];
  const maxPrices = ['250,000 AED', '300,000 AED', '350,000 AED', '400,000 AED', '450,000 AED'];
  const areaSizes = ['Above 250 Sq.Ft', 'Above 300 Sq.Ft', 'Above 350 Sq.Ft'];

  const isResidential = () => {
    return propertyPurpose === 'Residential Sale' || propertyPurpose === 'Residential Rent';
  };

  const handlePurposeChange = (event) => {
    setPropertyPurpose(event.target.value);
    setPropertyType('');
    setBedCount('Any beds');
  };

  const handleTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleBedCountChange = (event) => {
    setBedCount(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleAreaSizeChange = (event) => {
    setAreaSize(event.target.value);
  };


  const getPropertyTypes = (purpose) => {
    switch (purpose) {
      case 'Residential Sale':
      case 'Residential Rent':
        return residentialTypes;
      case 'Commercial Sale':
      case 'Commercial Rent':
        return commercialTypes;
      default:
        return [];
    }
  };

  const propertyTypes = getPropertyTypes(propertyPurpose);

  return (
    <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 'auto',
              width: '80%',
              padding: 4,
              transition: 'height 0.5s ease',
            },
          }}
        >
          <Paper elevation={5} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            width: '100%',
            height: expanded ? 'auto' : 140,
            overflow: 'hidden',
          }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
                justifyContent: 'space-around',
                mb: 2,
              }}
            >
              <FormControl sx={{ flex: 1 }}>
                <InputLabel id="propertyPurposeLabel">Purpose</InputLabel>
                <Select
                  labelId="propertyPurposeLabel"
                  id="propertyPurpose"
                  value={propertyPurpose}
                  label="Purpose"
                  onChange={handlePurposeChange}
                >
                  <MenuItem value={'Residential Sale'}>Residential Sale</MenuItem>
                  <MenuItem value={'Commercial Sale'}>Commercial Sale</MenuItem>
                  <MenuItem value={'Residential Rent'}>Residential Rent</MenuItem>
                  <MenuItem value={'Commercial Rent'}>Commercial Rent</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel id="propertyTypeLabel">Type</InputLabel>
                <Select
                  labelId="propertyTypeLabel"
                  id="propertyType"
                  value={propertyType}
                  label="Type"
                  onChange={handleTypeChange}
                >
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {isResidential() && (
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel id="bedsLabel">Beds</InputLabel>
                  <Select
                    labelId="bedsLabel"
                    id="bedsRange"
                    value={bedCount}
                    label="Beds"
                    onChange={handleBedCountChange}
                  >
                    <MenuItem value={'Any beds'}>Any beds</MenuItem>
                    <MenuItem value={'Studio'}>Studio</MenuItem>
                    <MenuItem value={'1 Bedroom'}>1 Bedroom</MenuItem>
                    <MenuItem value={'2 Bedrooms'}>2 Bedrooms</MenuItem>
                    <MenuItem value={'3 Bedrooms'}>3 Bedrooms</MenuItem>
                    <MenuItem value={'4 Bedrooms'}>4 Bedrooms</MenuItem>
                    <MenuItem value={'5+ Bedrooms'}>5+ Bedrooms</MenuItem>
                  </Select>
                </FormControl>
              )}
                <Box
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap:2,
                  }}
                >
                <Button
                    sx={{
                      bgcolor: '#000080',
                      color: '#EEE8AA',
                      width: 185,
                      height: 54,
                      '&:hover': {
                        bgcolor: '#16348C',
                        color: '#EEE8AA',
                      },
                    }}
                  >
                    Search
                  </Button>
                  <Button
                  sx={{
                    color: '#EEE8AA',
                    '&:hover': {
                      color: '#EEE8AA',
                      bgcolor: 'white'
                    },
                  }}
                    onClick={() => setExpanded(!expanded)} // Toggle expanded state
                    endIcon={!expanded ? <AddCircleIcon/> : <RemoveCircleIcon/>}
                  >
                    Advanced Search
                  </Button>
                </Box>
            </Box>

            {expanded && (
              <Box sx={{ display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
                justifyContent: 'space-around',
                mb: 2, 
              }}>
                <FormControl sx={{ flex: 1 }}>
                    <InputLabel id="minPriceLabel">Min. Price</InputLabel>
                    <Select
                    labelId="minPriceLabel"
                    id="minPrice"
                    value={minPrice}
                    label="Min. Price"
                    onChange={handleMinPriceChange}
                    >
                    {minPrices.map((price) => (
                        <MenuItem key={price} value={price}>
                        {price}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ flex: 1 }}>
                    <InputLabel id="maxPriceLabel">Max. Price</InputLabel>
                    <Select
                    labelId="maxPriceLabel"
                    id="maxPrice"
                    value={maxPrice}
                    label="Max. Price"
                    onChange={handleMaxPriceChange}
                    >
                    {maxPrices.map((price) => (
                        <MenuItem key={price} value={price}>
                        {price}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ flex: 1 }}>
                    <InputLabel id="areaSizeLabel">Area Size</InputLabel>
                    <Select
                    labelId="areaSizeLabel"
                    id="areaSize"
                    value={areaSize}
                    label="Area Size"
                    onChange={handleAreaSizeChange}
                    >
                    {areaSizes.map((size) => (
                        <MenuItem key={size} value={size}>
                        {size}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
              </Box>
            )}
          </Paper>
        </Box>
  );
}

export default Searchbar;