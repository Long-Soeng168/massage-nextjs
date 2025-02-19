import { BASE_API_URL } from "@/config/env";

export async function getBrands() {
    const url = BASE_API_URL + `/brands`;
    try {
      const response = await fetch(url, {
        next: {
          revalidate: 3600
        }
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Brands : ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }