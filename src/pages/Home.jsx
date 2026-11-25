import { useState } from "react";

import {
  Alert,
  Box,
  Snackbar,
} from "@mui/material";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Dashboard from "../components/Dashboard";
import DonationDialog from "../components/DonationDialog";
import Footer from "../components/Footer";

import { getDonations } from "../services/donationService";

function Home() {
  const [donations, setDonations] = useState(getDonations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  function handleOpenDialog(event) {
  event.currentTarget.blur();
  setDialogOpen(true);
}
  function handleDonationSubmit(donation) {
    setDonations((previous) => [
      ...previous,
      donation,
    ]);

    setSuccessOpen(true);
  }

  return (
    <>
      <Header />

      <Box component="main">
<Hero onDonate={handleOpenDialog} />
        <Dashboard donations={donations} />
      </Box>

      <Footer />

      <DonationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDonationSubmit}
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
          Test donation recorded successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;