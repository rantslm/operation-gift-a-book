import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import heroImage from "../assets/hero-books.jpg";

function Hero({ onDonate }) {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        bgcolor: "background.paper",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="overline"
              color="primary"
              sx={{
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              Sharing the gift of reading
            </Typography>

            <Typography variant="h1">
              Operation Gift a Book
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
              }}
            >
              Challenge Issued by Vickie Williams
            </Typography>

            <Typography>
              As a retired reading teacher, it is my goal to
              continue to help establish a love of reading for
              all ages. So, I have a challenge called Operation
              Gift a Book.
            </Typography>

            <Typography>
              Over the course of this year, I challenge each of
              you to gift or donate at least one book to an
              outlet!
            </Typography>

            <Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<AutoStoriesOutlinedIcon />}
                onClick={onDonate}
              >
                Log Book Donations
              </Button>
            </Box>
          </Stack>

          <Box
            component="img"
            src={heroImage}
            alt="A collection of books"
            sx={{
              width: "100%",
              height: { xs: 300, md: 500 },
              objectFit: "cover",
              borderRadius: 3,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;