import { BASE_API_URL } from "@/config/env";

export async function getHolds() {
  const url = BASE_API_URL + `/holds`;
  try {
    const response = await fetch(url, {
      cache: 'no-cache'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch holds : ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
export async function deleteHold(id, token) {
  const url = `${BASE_API_URL}/holds/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Correct HTTP method
      headers: {
        Authorization: `Bearer ${token}`, // Proper Authorization header
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete hold: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

