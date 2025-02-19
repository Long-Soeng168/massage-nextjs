import { BASE_API_URL } from "@/config/env";

export async function getNewArrivalBooks() {
  const url = BASE_API_URL + `/books_new_arrival`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch New Arrival Books : ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getBestSellingBooks({ limit } = {}) {
  const url =
    BASE_API_URL + `/books_best_selling?limit=${limit || ""}`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch Best Selling Books : ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getBooks({
  categoryId = "",
  subCategoryId = "",
  randomOrder = "",
  orderBy = "",
  orderDir = "",
  page = "",
  perPage = "",
  search = "",
  priceFrom = "",
  priceTo = "",
  yearFrom = "",
  yearTo = "",
  brandId = "",
  publisherId = "",
} = {}) {
  const queryParams = new URLSearchParams({
    categoryId,
    subCategoryId,
    randomOrder,
    page,
    search,
    perPage,
    orderBy,
    orderDir,
    priceFrom,
    priceTo,
    yearFrom,
    yearTo,
    brandId,
    publisherId,
  });

  const url = `${BASE_API_URL}/books?${queryParams}`;
  // console.log(url);
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Books : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getServices({
  categoryId = "",
  subCategoryId = "",
  randomOrder = "",
  orderBy = "",
  orderDir = "",
  page = "",
  perPage = "",
  search = "",
  priceFrom = "",
  priceTo = "",
  yearFrom = "",
  yearTo = "",
  brandId = "",
  publisherId = "",
} = {}) {
  const queryParams = new URLSearchParams({
    categoryId,
    subCategoryId,
    randomOrder,
    page,
    search,
    perPage,
    orderBy,
    orderDir,
    priceFrom,
    priceTo,
    yearFrom,
    yearTo,
    brandId,
    publisherId,
  });

  const url = `${BASE_API_URL}/services?${queryParams}`;
  // console.log(url);
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Services : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getPackages({
  categoryId = "",
  subCategoryId = "",
  randomOrder = "",
  orderBy = "",
  orderDir = "",
  page = "",
  perPage = "",
  search = "",
  priceFrom = "",
  priceTo = "",
  yearFrom = "",
  yearTo = "",
  brandId = "",
  publisherId = "",
} = {}) {
  const queryParams = new URLSearchParams({
    categoryId,
    subCategoryId,
    randomOrder,
    page,
    search,
    perPage,
    orderBy,
    orderDir,
    priceFrom,
    priceTo,
    yearFrom,
    yearTo,
    brandId,
    publisherId,
  });

  const url = `${BASE_API_URL}/packages?${queryParams}`;
  // console.log(url);
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch packages : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getKidBooks({
  categoryId = "",
  subCategoryId = "",
  randomOrder = "",
  orderBy = "",
  orderDir = "",
  page = "",
  perPage = "",
  search = "",
  priceFrom = "",
  priceTo = "",
  yearFrom = "",
  yearTo = "",
  brandId = "",
  publisherId = "",
} = {}) {
  const queryParams = new URLSearchParams({
    categoryId,
    subCategoryId,
    randomOrder,
    page,
    search,
    perPage,
    orderBy,
    orderDir,
    priceFrom,
    priceTo,
    yearFrom,
    yearTo,
    brandId,
    publisherId,
  });

  const url = `${BASE_API_URL}/kid_books?${queryParams}`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Kids Books : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getBook({ id }) {
  const url = BASE_API_URL + `/books/${id}`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if(response.status == 404){
      return 404;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch Book : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
