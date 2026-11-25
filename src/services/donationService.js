import {
  districts,
  donationAvenues,
  donations,
} from "../data/mockData";

export function getDistricts() {
  return districts;
}

export function getDonationAvenues() {
  return donationAvenues;
}

export function getDonations() {
  return donations;
}

export function getImpactSummary(records = donations) {
  return {
    totalBooks: records.reduce(
      (total, donation) => total + donation.books,
      0
    ),

    totalAmount: records.reduce(
      (total, donation) => total + donation.amount,
      0
    ),

    participatingDistricts: new Set(
      records
        .filter((donation) => donation.districtId !== "Other")
        .map((donation) => donation.districtId)
    ).size,

    totalDonations: records.length,
  };
}

export function getDistrictStats(records = donations) {
  return districts.map((district) => {
    const districtDonations = records.filter(
      (donation) => donation.districtId === district.id
    );

    const summary = getImpactSummary(districtDonations);

    const latestDonation = districtDonations.reduce(
      (latest, donation) =>
        !latest || donation.date > latest
          ? donation.date
          : latest,
      null
    );

    return {
      ...district,
      totalBooks: summary.totalBooks,
      totalAmount: summary.totalAmount,
      totalDonations: summary.totalDonations,
      latestDonation,
    };
  });
}

export function getDistrictSpotlight(records = donations) {
  const districtStats = getDistrictStats(records).filter(
    (district) => district.id !== "Other"
  );

  const topByBooks = [...districtStats]
    .filter((district) => district.totalBooks > 0)
    .sort((a, b) => b.totalBooks - a.totalBooks)
    .slice(0, 3);

  const topByAmount = [...districtStats]
    .filter((district) => district.totalAmount > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 3);

  return {
    topByBooks,
    topByAmount,
  };
}