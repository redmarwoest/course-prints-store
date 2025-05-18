import * as yup from "yup";
import { Course, GolfClub } from "../../app/types/types";

export const courseSchema: yup.ObjectSchema<Course> = yup.object().shape({
  courseID: yup.string().required("Course ID is required"),
  courseName: yup.string().required("Course name is required"),
  svgMap: yup.string().required("SVG map is required"),
  latitude: yup.string(),
  longitude: yup.string(),
  scoreCard: yup.array().of(
    yup.object().shape({
      holeNumber: yup.number().required(),
      par: yup.number().required(),
      distance: yup.object().shape({
        blue: yup.number(),
        white: yup.number(),
        red: yup.number(),
        gold: yup.number(),
      }),
    })
  ),
});

export const golfCourseSchema: yup.ObjectSchema<GolfClub> = yup.object().shape({
  clubID: yup.string().required("Club ID is required"),
  clubName: yup.string().required("Club name is required"),
  latitude: yup.string().required("Latitude is required"),
  longitude: yup.string().required("Longitude is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  address: yup.string().required("Address is required"),
  courses: yup
    .array()
    .of(courseSchema)
    .min(1, "At least one course is required")
    .default(() => [
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
    ]),
});
