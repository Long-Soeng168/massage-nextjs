import { BASE_API_URL } from "@/config/env";

export async function getCategories({
  limit,
  withSub,
  orderBy,
  orderDir,
} = {}) {
  const url =
    BASE_API_URL +
    `/categories?limit=${limit || ""}&withSub=${withSub || ""}&orderBy=${
      orderBy || ""
    }&orderDir=${orderDir || ""}`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Categories : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getCategoryHasMostBooks() {
  const url = BASE_API_URL + `/categories_most_books`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Category most Book : ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
