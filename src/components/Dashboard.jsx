import { useMemo } from "react";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import ImpactSummary from "./ImpactSummary";
import DistrictSpotlight from "./DistrictSpotlight";

import {
  getImpactSummary,
  getDistrictSpotlight,
} from "../services/donationService";

function Dashboard({ donations }) {
  const summary = useMemo(
    () => getImpactSummary(donations),
    [donations]
  );

  const spotlight = useMemo(
    () => getDistrictSpotlight(donations),
    [donations]
  );

  return (
    <Box
      component="section"
      id="dashboard"
      aria-labelledby="dashboard-heading"
      sx={{ py: { xs: 6, md: 10 } }}
    >
      <Container maxWidth="lg">
        <Typography
          id="dashboard-heading"
          variant="h2"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Our Collective Impact
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Together, we are sharing the gift of reading.
        </Typography>

        <ImpactSummary summary={summary} />

        <DistrictSpotlight spotlight={spotlight} />
      </Container>
    </Box>
  );
}

export default Dashboard;