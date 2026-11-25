import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
} from "@mui/material";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Dashboard from "../components/Dashboard";
import DonationDialog from "../components/DonationDialog";
import Footer from "../components/Footer";

import {
  getOptions,
  getDashboard,
  submitDonation,
} from "../services/donationService";

function Home() {
  const [options, setOptions] = useState(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  const [dashboard, setDashboard] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const donateButtonRef = useRef(null);

  const loadOptions = useCallback(async () => {
    setOptionsLoading(true);
    setOptionsError("");

    try {
      const data = await getOptions();
      setOptions(data);
    } catch (error) {
      setOptionsError(
        error.message || "Unable to load donation options."
      );
    } finally {
      setOptionsLoading(false);
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    setDashboardLoading(true);
    setDashboardError("");

    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      setDashboardError(
        error.message || "Unable to load campaign statistics."
      );
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOptions();
    loadDashboard();
  }, [loadOptions, loadDashboard]);

  function handleOpenDialog(event) {
    if (!options?.acceptingDonations) {
      return;
    }

    donateButtonRef.current = event.currentTarget;

    event.currentTarget.blur();
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
  }

  function handleDialogExited() {
    donateButtonRef.current?.focus();
  }

  async function handleDonationSubmit(donation) {
    await submitDonation(donation);

    setSuccessOpen(true);

    loadDashboard();
  }

  const donationDisabled =
    optionsLoading ||
    Boolean(optionsError) ||
    !options?.acceptingDonations;

  return (
    <>
      <Header />

      <Box component="main">
        <Hero
          onDonate={handleOpenDialog}
          donationDisabled={donationDisabled}
        />

        {optionsError && (
          <Container maxWidth="lg" sx={{ mt: 3 }}>
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  onClick={loadOptions}
                >
                  Retry
                </Button>
              }
            >
              {optionsError}
            </Alert>
          </Container>
        )}

        {!optionsLoading &&
          !optionsError &&
          options &&
          !options.acceptingDonations && (
            <Container maxWidth="lg" sx={{ mt: 3 }}>
              <Alert severity="info">
                The campaign is not currently accepting
                donations.
              </Alert>
            </Container>
          )}

        <Dashboard
          dashboard={dashboard}
          loading={dashboardLoading}
          error={dashboardError}
          onRetry={loadDashboard}
        />
      </Box>

      <Footer />

      <DonationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onExited={handleDialogExited}
        onSubmit={handleDonationSubmit}
        districts={options?.districts || []}
        avenues={options?.donationAvenues || []}
      />

      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
        >
          Thank you! Your donation has been recorded.
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;