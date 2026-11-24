import { Box, Container, Typography, Stack } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "text.primary",
        color: "background.default",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <AutoStoriesOutlinedIcon sx={{ fontSize: 36 }} />

          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Operation Gift a Book
          </Typography>

          <Typography sx={{ textAlign: "center" }}>
            Together, we're building a love of reading.
          </Typography>

          <Typography variant="body2">
            © {new Date().getFullYear()} Operation Gift a Book
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;