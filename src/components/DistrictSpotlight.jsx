import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import EmojiEventsOutlinedIcon from
  "@mui/icons-material/EmojiEventsOutlined";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function DistrictSpotlight({ spotlight }) {
  const [category, setCategory] = useState("books");

  const featuredDistricts =
    category === "books"
      ? spotlight.topByBooks
      : spotlight.topByAmount;

  function handleCategoryChange(event, newCategory) {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  }

  function getDistrictName(district) {
    return district.id === "Research Lodges"
      ? district.name
      : `District ${district.name}`;
  }

  return (
    <Box
      component="section"
      aria-labelledby="spotlight-heading"
      sx={{ mt: 8 }}
    >
      <Typography
        id="spotlight-heading"
        variant="h3"
        sx={{ textAlign: "center", mb: 2 }}
      >
        District Spotlight
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          textAlign: "center",
          maxWidth: 600,
          mx: "auto",
          mb: 4,
        }}
      >
        Celebrating districts making an outstanding
        impact in our communities.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={handleCategoryChange}
          aria-label="Donation category"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <ToggleButton
            value="books"
            sx={{
              flex: 1,
              px: { xs: 2, sm: 4 },
              textTransform: "none",
            }}
          >
            Books Donated
          </ToggleButton>

          <ToggleButton
            value="amount"
            sx={{
              flex: 1,
              px: { xs: 2, sm: 4 },
              textTransform: "none",
            }}
          >
            Dollar Contributions
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {featuredDistricts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: `repeat(${featuredDistricts.length}, 1fr)`,
            },
            gap: 3,
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {featuredDistricts.map((district) => (
            <Card
              key={district.id}
              sx={{
                bgcolor: "background.paper",
                textAlign: "center",
              }}
            >
              <CardContent sx={{ py: 4 }}>
                <EmojiEventsOutlinedIcon
                  aria-hidden="true"
                  sx={{
                    fontSize: 44,
                    color: "primary.main",
                    mb: 2,
                  }}
                />

                <Typography variant="h6" sx={{ mb: 1 }}>
                  {getDistrictName(district)}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {category === "books"
                    ? district.totalBooks.toLocaleString()
                    : currency.format(district.totalAmount)}
                </Typography>

                <Typography color="text.secondary">
                  {category === "books"
                    ? "Books donated"
                    : "Contributed"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 5,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Our journey is just beginning!
          </Typography>

          <Typography color="text.secondary">
            Districts will be featured here as
            contributions are received.
          </Typography>
        </Box>
      )}

      <Typography
        sx={{
          textAlign: "center",
          color: "secondary.main",
          fontStyle: "italic",
          mt: 4,
        }}
      >
        Every contribution, big or small, makes a difference.
      </Typography>
    </Box>
  );
}

export default DistrictSpotlight;