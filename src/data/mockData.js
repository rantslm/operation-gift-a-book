const districtNumbers = [
  "1A", "1B", "2", "3", "4", "5", "6", "7", "8", "9",
  "10", "11", "12", "14", "15A", "15B",
  "16", "17", "19", "20", "21", "22", "24", "25",
  "27", "29", "31", "33", "35", "36", "37", "38",
  "39", "40", "41", "42", "43", "44", "45", "47",
  "48", "49", "50", "56", "57",
  "Research Lodges", "Other",
];

export const districts = districtNumbers.map((number) => ({
  id: number,
  name: number,
}));

export const donationAvenues = [
  {
    id: "A01",
    name: "Gift a book to a friend, relative, or neighbor",
  },
  { id: "A02", name: "Little Free Library" },
  { id: "A03", name: "Nursing home" },
  { id: "A04", name: "Classroom teacher" },
  { id: "A05", name: "Homeless shelter" },
  {
    id: "A06",
    name: "Donate to Dolly Parton's Imagination Library",
  },
  { id: "A07", name: "Build a Little Free Library" },
];

export const donations = [
  {
    id: "D01",
    districtId: "1A",
    avenueId: "A02",
    books: 25,
    amount: 250,
    date: "2026-11-10",
  },
  {
    id: "D02",
    districtId: "1B",
    avenueId: "A04",
    books: 40,
    amount: 400,
    date: "2026-11-12",
  },
  {
    id: "D03",
    districtId: "2",
    avenueId: "A03",
    books: 18,
    amount: 180,
    date: "2026-11-14",
  },
  {
    id: "D04",
    districtId: "1A",
    avenueId: "A01",
    books: 32,
    amount: 320,
    date: "2026-11-15",
  },
  {
    id: "D05",
    districtId: "15A",
    avenueId: "A06",
    books: 0,
    amount: 120,
    date: "2026-11-16",
  },
  {
    id: "D06",
    districtId: "27",
    avenueId: "A05",
    books: 20,
    amount: 0,
    date: "2026-11-17",
  },
];