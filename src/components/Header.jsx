import { Box, Container, Stack, Typography, Link } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

function Header() {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: "background.default",
        borderBottom: 1,
        borderColor: "divider",
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Stack
  direction="row"
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
  }}
>
          <Stack
  direction="row"
  spacing={1.5}
  sx={{ alignItems: "center" }}
>
            <AutoStoriesOutlinedIcon
              color="primary"
              sx={{ fontSize: 32 }}
            />

            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: "1.25rem",
              }}
            >
              Operation Gift a Book
            </Typography>
          </Stack>

          <Stack
            component="nav"
            aria-label="Main navigation"
            direction="row"
            spacing={3}
          >
            <Link href="#home" color="inherit" underline="hover">
              Home
            </Link>

            <Link href="#dashboard" color="inherit" underline="hover">
              Our Impact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Header;