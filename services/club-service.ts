import { ClubOption, GolfClub } from "../app/types/types";

export const fetchClubNames = async (
  search?: string
): Promise<ClubOption[]> => {
  try {
    const url = search ? `/api/get-clubs?search=${search}` : "/api/get-clubs";
    const response = await fetch(url);
    const data = await response.json();

    if (data.clubs) {
      return data.clubs;
    }
    return [];
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return [];
  }
};

export const fetchClubDetails = async (
  clubID: string
): Promise<GolfClub | null> => {
  try {
    const response = await fetch(`/api/get-club?clubID=${clubID}`);
    const data = await response.json();

    if (data.items?.[0]) {
      return data.items[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching club details:", error);
    return null;
  }
};
