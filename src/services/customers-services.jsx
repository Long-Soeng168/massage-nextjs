import { BASE_API_URL } from "@/config/env";

export async function getCustomers() {
  const url = BASE_API_URL + `/customers`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch customers : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
