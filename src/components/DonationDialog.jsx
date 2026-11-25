import { useState, useRef } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { Turnstile } from "@marsidev/react-turnstile";



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

function DonationDialog({
  open,
  onClose,
  onExited,
  onSubmit,
  districts = [],
  avenues = [],
}) {  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");
const [verificationError, setVerificationError] = useState("");
const pendingDonationRef = useRef(null);

const turnstileRef = useRef(null);
const requestIdRef = useRef(null);
const submittingRef = useRef(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }
function resetVerification() {
  setTurnstileToken("");
  setVerificationError("");
  turnstileRef.current?.reset();
}

  function handleClose() {
  if (submittingRef.current) {
    return;
  }

  setForm(initialForm);
  setError("");
  resetVerification();

  requestIdRef.current = null;
  pendingDonationRef.current = null;

  onClose();
}

async function handleSubmit(event) {
  event.preventDefault();

  if (submittingRef.current) {
    return;
  }

  setError("");

  const books = Number(form.books || 0);
  const amount = Number(form.amount || 0);

  if (
    !Number.isSafeInteger(books) ||
    books < 0 ||
    books > 1000000 ||
    !Number.isFinite(amount) ||
    amount < 0 ||
    amount > 1000000 ||
    Math.abs(
      amount * 100 - Math.round(amount * 100)
    ) > 0.000001
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
    setError(
      "Please specify your district or affiliation."
    );
    return;
  }

  if (!turnstileToken) {
    setVerificationError(
      "Please complete the security verification."
    );
    return;
  }

  const donationDetails = JSON.stringify({
  ...form,
  books,
  amount,
});

if (
  pendingDonationRef.current &&
  pendingDonationRef.current !== donationDetails
) {
  setError(
    "Your previous submission could not be confirmed. " +
    "Please retry with the original information " +
    "before making changes."
  );

  return;
}

pendingDonationRef.current = donationDetails;

  if (!requestIdRef.current) {
    requestIdRef.current = crypto.randomUUID();
  }

  const donation = {
    ...form,
    email: form.email.trim(),
    name: form.name.trim(),
    otherDistrict:
      form.districtId === "Other"
        ? form.otherDistrict.trim()
        : "",
    notes: form.notes.trim(),
    books,
    amount,
    requestId: requestIdRef.current,
    turnstileToken,
  };

  submittingRef.current = true;
  setSubmitting(true);

  try {
    await onSubmit(donation);

    setForm(initialForm);
    setError("");
    requestIdRef.current = null;
    pendingDonationRef.current = null;

    resetVerification();
    onClose();
  } catch (error) {
    setError(
      error.message || "Unable to record your donation."
    );

    resetVerification();
  } finally {
    submittingRef.current = false;
    setSubmitting(false);
  }
}

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      aria-labelledby="donation-dialog-title"
      slotProps={{
    transition: {
      onExited,
    },
  }}
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
          <CloseIcon disabled={submitting} />
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
              disabled={submitting}
            />

            <TextField
              label="Full Name (Optional)"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              disabled={submitting}
            />

            <TextField
              select
              label="District"
              name="districtId"
              value={form.districtId}
              onChange={handleChange}
              required
              disabled={submitting}
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
                disabled={submitting}
              />
            )}

            <TextField
              select
              label="Donation Avenue"
              name="avenueId"
              value={form.avenueId}
              onChange={handleChange}
              required
              disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
              disabled={submitting}
            />

            <Box sx={{ mt: 1 }}>
  {open && (
    <Turnstile
      ref={turnstileRef}
      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
      onSuccess={(token) => {
        setTurnstileToken(token);
        setVerificationError("");
      }}
      onExpire={() => {
        setTurnstileToken("");
      }}
      onError={() => {
        setTurnstileToken("");
        setVerificationError(
          "Security verification failed. Please try again."
        );
      }}
      options={{
        theme: "light",
        size: "flexible",
        action: "donate",
        refreshExpired: "auto",
      }}
    />
  )}

  {verificationError && (
    <Alert
      severity="error"
      sx={{ mt: 1 }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={resetVerification}
          disabled={submitting}
        >
          Retry
        </Button>
      }
    >
      {verificationError}
    </Alert>
  )}
</Box>

            <Typography variant="body2" color="text.secondary">
              Your personal information will not appear
              on the public dashboard.
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
  <Button
    onClick={handleClose}
    disabled={submitting}
  >
    Cancel
  </Button>

  <Button
    type="submit"
    variant="contained"
    disabled={submitting || !turnstileToken}
    startIcon={
      submitting ? (
        <CircularProgress
          size={18}
          color="inherit"
        />
      ) : null
    }
  >
    {submitting
      ? "Submitting..."
      : "Submit Donation"}
  </Button>
</DialogActions>
      </Box>
    </Dialog>
  );
}

export default DonationDialog;