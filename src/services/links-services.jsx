import { BASE_API_URL } from "@/config/env";

export async function getLinks() {
  const url = BASE_API_URL + `/links`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 120
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Links : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
 