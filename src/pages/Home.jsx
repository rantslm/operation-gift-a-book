import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";

import AutoStoriesOutlinedIcon from
  "@mui/icons-material/AutoStoriesOutlined";

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 10, textAlign: "center" }}>
        <AutoStoriesOutlinedIcon
          color="primary"
          sx={{ fontSize: 64, mb: 2 }}
        />

        <Typography variant="h1" gutterBottom>
          Operation Gift a Book
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
        >
          Challenge Issued by Vickie Williams
        </Typography>

        <Typography
          sx={{
            maxWidth: 650,
            mx: "auto",
            mb: 4,
          }}
        >
          As a retired reading teacher, it is my goal to
          continue to help establish a love of reading for
          all ages. So, I have a challenge called Operation
          Gift a Book. Over the course of this year, I
          challenge each of you to gift or donate at least
          one book to an outlet!
        </Typography>

        <Button variant="contained">
          Log Book Donations
        </Button>
      </Box>
    </Container>
  );
}

export default Home;