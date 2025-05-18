import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { GolfClub } from "../app/types/types";

export const handleFileUpload = (
  index: number,
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<GolfClub>
) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.includes("svg")) {
    alert("Please upload an SVG file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const svgData = e.target?.result as string;
    setValue(`courses.${index}.svgMap`, svgData);
  };
  reader.readAsDataURL(file);
};

export const handleAddCourse = (
  watch: UseFormWatch<GolfClub>,
  setValue: UseFormSetValue<GolfClub>
) => {
  const currentCourses = watch("courses") || [];
  setValue("courses", [
    ...currentCourses,
    {
      courseID: `course-${Date.now()}`,
      courseName: "",
      svgMap: "",
      latitude: "",
      longitude: "",
      scoreCard: Array(18)
        .fill(0)
        .map((_, index) => ({
          holeNumber: index + 1,
          par: 4,
          distance: {
            blue: 0,
            white: 0,
            red: 0,
            gold: 0,
          },
        })),
    },
  ]);
};

export const handleRemoveCourse = (
  index: number,
  watch: UseFormWatch<GolfClub>,
  setValue: UseFormSetValue<GolfClub>
) => {
  const currentCourses = watch("courses") || [];
  setValue(
    "courses",
    currentCourses.filter((_, i) => i !== index)
  );
};
