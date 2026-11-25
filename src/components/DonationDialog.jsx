import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import {
  getDistricts,
  getDonationAvenues,
} from "../services/donationService";

const initialForm = {
  email: "",
  name: "",
  districtId: "",
  otherDistrict: "",
  avenueId: "",
  books: "",
  amount: "",
  notes: "",
};

function DonationDialog({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const districts = getDistricts();
  const avenues = getDonationAvenues();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleClose() {
    setForm(initialForm);
    setError("");
    onClose();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const books = Number(form.books || 0);
    const amount = Number(form.amount || 0);

    if (
      !Number.isInteger(books) ||
      books < 0 ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      setError("Please enter valid donation amounts.");
      return;
    }

    if (books === 0 && amount === 0) {
      setError(
        "Please enter at least one book or a dollar amount."
      );
      return;
    }

    if (
      form.districtId === "Other" &&
      !form.otherDistrict.trim()
    ) {
      setError("Please specify your district or affiliation.");
      return;
    }

    const donation = {
      ...form,
      email: form.email.trim(),
      name: form.name.trim(),
      otherDistrict:
        form.districtId === "Other"
          ? form.otherDistrict.trim()
          : "",
      books,
      amount,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    onSubmit(donation);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      aria-labelledby="donation-dialog-title"
    >
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle
          id="donation-dialog-title"
          sx={{ pr: 7 }}
        >
          Log Book Donations
        </DialogTitle>

        <IconButton
          aria-label="Close donation form"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Stack spacing={3}>
            <Typography color="text.secondary">
              Thank you for sharing the gift of reading!
            </Typography>

            {error && (
              <Alert severity="error">{error}</Alert>
            )}

            <TextField
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              autoFocus
              required
            />

            <TextField
              label="Full Name (Optional)"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
            />

            <TextField
              select
              label="District"
              name="districtId"
              value={form.districtId}
              onChange={handleChange}
              required
            >
              {districts.map((district) => (
                <MenuItem
                  key={district.id}
                  value={district.id}
                >
                  {district.name}
                </MenuItem>
              ))}
            </TextField>

            {form.districtId === "Other" && (
              <TextField
                label="District or Affiliation"
                name="otherDistrict"
                value={form.otherDistrict}
                onChange={handleChange}
                required
              />
            )}

            <TextField
              select
              label="Donation Avenue"
              name="avenueId"
              value={form.avenueId}
              onChange={handleChange}
              required
            >
              {avenues.map((avenue) => (
                <MenuItem
                  key={avenue.id}
                  value={avenue.id}
                  sx={{ whiteSpace: "normal" }}
                >
                  {avenue.name}
                </MenuItem>
              ))}
            </TextField>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              <TextField
                label="Number of Books"
                name="books"
                type="number"
                value={form.books}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 1,
                  },
                }}
              />

              <TextField
                label="Dollar Amount ($)"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 0.01,
                  },
                }}
              />
            </Box>

            <Typography variant="body2" color="text.secondary">
              Enter the number of books, dollar amount, or both.
            </Typography>

            <TextField
              label="Additional Information (Optional)"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="Share any additional details."
            />

            <Typography variant="body2" color="text.secondary">
              Your personal information will not appear
              on the public dashboard.
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Submit Donation
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default DonationDialog;