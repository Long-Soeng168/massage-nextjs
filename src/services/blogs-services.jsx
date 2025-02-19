// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import { BASE_API_URL } from "@/config/env";

export async function getBlogs({categoryId, perPage, currentPage, search} = {}) {
  const url = BASE_API_URL + `/news?categoryId=${categoryId || ''}&perPage=${perPage || ''}&search=${search || ''}&page=${currentPage || ''}`;

  // await sleep(3000);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if(response.status == 404){
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getBlog(id) {
  const url = BASE_API_URL + "/news/" + id;
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
      throw new Error(`Failed to fetch Blogs: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getBlogCategories() {
  const url = BASE_API_URL + `/news_categories`;
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 3600
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Blogs: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
