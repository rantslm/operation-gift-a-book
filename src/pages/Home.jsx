import { Box, Container, Typography } from "@mui/material";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />

      <Box component="main">
        <Hero />

        <Box
          component="section"
          id="dashboard"
          sx={{ py: 8 }}
        >
          <Container maxWidth="lg">
            <Typography
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
              See how our chapters are sharing the gift of
              reading in their communities.
            </Typography>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default Home;