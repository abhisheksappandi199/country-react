import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Country } from "../types/Country";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, height: 350, display: "flex", flexDirection: "column" }} onClick={() => navigate(`/country/${country.code}`)}>
      {/* Fix Image Size */}
      <CardMedia
        component="img"
        image={country.flag}
        alt={country.name}
        sx={{ height: 150, objectFit: "contain" }}
      />
      
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{country.name}</Typography>
        <Typography variant="body2">Capital: {country.capital}</Typography>
        <Typography variant="body2">Region: {country.region}</Typography>
        <Typography variant="body2">Time: {DateTime.now().setZone(country.timezones).toFormat("hh:mm:ss a")}</Typography>
      </CardContent>
    </Card>
  );
};


export default CountryCard;
