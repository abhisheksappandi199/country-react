import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCountryDetails } from "../services/countryService";
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress, Button } from "@mui/material";
import { DateTime } from "luxon";

interface Currency {
  name: string;
  symbol: string;
}

const CountryDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryDetails(code as string);
        console.log("🚀 ~ loadCountry ~ data:", data)
        setCountry(data);
      } catch (error) {
        console.error("Failed to fetch country details", error);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [code]);

  if (loading) {
    return (
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ marginTop: "10px" }}>
          Loading country details...
        </Typography>
      </Container>
    );
  }

  const currency = country?.currencies ? (Object.values(country.currencies)[0] as Currency) : null;
  const currencyName = currency ? currency?.name : "Unknown";

  return (
    <Container sx={{ maxWidth: "600px", margin: "auto", paddingTop: "20px" }}>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ marginBottom: 2 }}>
        ← Back
      </Button>

      <Card>
        <CardMedia component="img" image={country?.flag} alt={country?.name} sx={{ height: 150, objectFit: "contain" }} />
        <CardContent>
          <Typography variant="h4">{country?.name}</Typography>
          <Typography variant="body1">Region: {country?.region}</Typography>
          <Typography variant="body1">Capital: {country?.capital}</Typography>
          <Typography variant="body1">Population: {country?.population.toLocaleString()}</Typography>
          <Typography variant="body1">Currency: {currencyName}</Typography>
          <Typography variant="body1">
            Current Time: <strong>{DateTime.now().setZone(country?.timezones).toFormat("hh:mm:ss a")}</strong>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CountryDetail;
