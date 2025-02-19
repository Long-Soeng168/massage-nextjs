import { BASE_API_URL } from "@/config/env";

export async function fetchAPI(endpoint) {
  const url = BASE_API_URL + endpoint;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getContact() {
  return await fetchAPI("/contact");
}

export async function getAbout() {
  return await fetchAPI("/about");
}
