// app/api/blogs/route.js

import { BASE_API_URL } from "@/config/env";

export async function GET(request) {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const categoryId = url.searchParams.get('categoryId') || '';
    const perPage = url.searchParams.get('perPage') || 10;
  
    try {
      const response = await fetch(
        `${BASE_API_URL}/news?categoryId=${categoryId}&search=${search}&perPage=${perPage}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      return new Response(JSON.stringify(data));
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  }
  