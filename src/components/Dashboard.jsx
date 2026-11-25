import { useState, useMemo } from "react";

import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import ImpactSummary from "./ImpactSummary";

import {
  getImpactSummary,
  getDistrictStats,
} from "../services/donationService";

function Dashboard({ donations }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("books");

  const summary = useMemo(
    () => getImpactSummary(donations),
    [donations]
  );

  const districtStats = useMemo(
    () => getDistrictStats(donations),
    [donations]
  );

  const filteredDistricts = useMemo(() => {
    const result = districtStats.filter((district) =>
      district.name.toLowerCase().includes(
        search.trim().toLowerCase()
      )
    );

    return result.sort((a, b) => {
      switch (sortBy) {
        case "books":
          return b.totalBooks - a.totalBooks;

        case "amount":
          return b.totalAmount - a.totalAmount;

        case "recent":
          return (b.latestDonation || "").localeCompare(
            a.latestDonation || ""
          );

        case "district":
          return a.name.localeCompare(b.name, undefined, {
            numeric: true,
          });

        default:
          return 0;
      }
    });
  }, [districtStats, search, sortBy]);

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Box
      component="section"
      id="dashboard"
      sx={{ py: { xs: 6, md: 10 } }}
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
          See how our districts are sharing the gift of
          reading in their communities.
        </Typography>

        <ImpactSummary summary={summary} />

        <Typography variant="h3" sx={{ mb: 3 }}>
          District Leaderboard
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            label="Search Districts"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <MenuItem value="books">Most Books</MenuItem>
            <MenuItem value="amount">Most Money</MenuItem>
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="district">
              District Number
            </MenuItem>
          </TextField>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            bgcolor: "background.default",
            maxHeight: 600,
          }}
        >
          <Table stickyHeader aria-label="District leaderboard">
            <TableHead>
              <TableRow>
                <TableCell>District</TableCell>
                <TableCell align="right">Books</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredDistricts.map((district) => (
                <TableRow key={district.id} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: 600 }}
                  >
                    {district.name}
                  </TableCell>

                  <TableCell align="right">
                    {district.totalBooks.toLocaleString()}
                  </TableCell>

                  <TableCell align="right">
                    {currency.format(district.totalAmount)}
                  </TableCell>
                </TableRow>
              ))}

              {filteredDistricts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ textAlign: "center", py: 4 }}
                  >
                    No districts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default Dashboard;