const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest(action, options = {}) {
  if (!API_URL) {
    throw new Error("API URL is not configured.");
  }

  const url = new URL(API_URL);

  if (action) {
    url.searchParams.set("action", action);
  }

  const response = await fetch(url.toString(), {
    ...options,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Unable to connect to the server.");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Something went wrong."
    );
  }

  return result;
}

export async function getOptions() {
  const result = await apiRequest("options");
  return result.data;
}

export async function getDashboard() {
  const result = await apiRequest("dashboard");
  return result.data;
}

export async function submitDonation(donation) {
  return apiRequest(null, {
    method: "POST",

    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },

    body: JSON.stringify({
      action: "donate",
      data: donation,
    }),
  });
}