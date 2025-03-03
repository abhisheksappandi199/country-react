import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Select, MenuItem, Box, CircularProgress } from "@mui/material";
import CountryCard from "../components/CountryCard";
import { Country } from "../types/Country"; 

const CountryList = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, [region]);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const url = region
      ? `http://localhost:5000/api/countries/region/${region}`
      : `http://localhost:5000/api/countries`;

      const response = await axios.get(url);
      const countries: Country[] = response.data.map((country: any) => ({
        name: country.name || "Unknown",
        capital: country.capital?.[0] || "N/A",
        region: country.region || "N/A",
        flag: country.flag,
        timezones: country.timezones || ["UTC"],  
        code: country.code || "N/A", 
      }));
  
      setAllCountries(countries);
    } catch (error) {
      console.error("Error fetching countries", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Search & Filter */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4, marginLeft: 8, marginRight: 8, marginTop: 3 }}>
        <TextField
          fullWidth
          label="Search by Name or Capital"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={region} onChange={(e) => setRegion(e.target.value)} displayEmpty>
          <MenuItem value="">All Regions</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
        </Select>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Country Grid */}
      <Grid container spacing={3} justifyContent="center">
        {!loading && allCountries.length > 0 &&
          allCountries
            .filter((each) => each.name.toLowerCase().includes(search.toLowerCase()) || each.capital.toLowerCase().includes(search.toLowerCase()))
            .map((country, index) => (
              <Grid item key={index}>
                <CountryCard country={country} />
              </Grid>
            ))}
      </Grid>

    </Box>
  );
};

export default CountryList;
