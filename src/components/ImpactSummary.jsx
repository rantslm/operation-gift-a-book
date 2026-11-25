import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

function ImpactSummary({ summary }) {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  const stats = [
    {
      label: "Books Donated",
      value: summary.totalBooks.toLocaleString(),
      icon: AutoStoriesOutlinedIcon,
    },
    {
      label: "Donation Value",
      value: currency.format(summary.totalAmount),
      icon: VolunteerActivismOutlinedIcon,
    },
    {
      label: "Participating Districts",
value: summary.participatingDistricts,
      icon: GroupsOutlinedIcon,
    },
    {
      label: "Total Donations",
      value: summary.totalDonations,
      icon: CardGiftcardOutlinedIcon,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
        my: 5,
      }}
    >
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardContent
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            <Icon
              color="primary"
              sx={{ fontSize: 40, mb: 2 }}
            />

            <Typography
              variant="h3"
              component="p"
              sx={{ mb: 1 }}
            >
              {value}
            </Typography>

            <Typography color="text.secondary">
              {label}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ImpactSummary;