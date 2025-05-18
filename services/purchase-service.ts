import { FormData } from "../app/types/types";

export const createPoster = async (
  poster: FormData
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch("/api/create-poster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(poster),
    });

    console.log(response, "response");

    return { success: true };
  } catch (error) {
    console.error("Error creating poster:", error);
    throw error;
  }
};
