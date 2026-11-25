import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

import ImpactSummary from "./ImpactSummary";
import DistrictSpotlight from "./DistrictSpotlight";

function Dashboard({
  dashboard,
  loading,
  error,
  onRetry,
}) {
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

        {loading ? (
          <Box
            role="status"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              py: 8,
            }}
          >
            <CircularProgress />

            <Typography color="text.secondary">
              Loading campaign statistics...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ mt: 4 }}>
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  onClick={onRetry}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        ) : dashboard ? (
          <>
            <ImpactSummary summary={dashboard.summary} />

            <DistrictSpotlight
              spotlight={dashboard.spotlight}
            />
          </>
        ) : null}
      </Container>
    </Box>
  );
}

export default Dashboard;