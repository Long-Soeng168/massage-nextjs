"use server";

import { revalidatePath } from "next/cache";

const clearCache = (path) => {
  revalidatePath(path);
  return null;
};

export default clearCache;
