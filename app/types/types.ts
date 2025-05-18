import { DateTime } from "luxon";

export interface ClubOption {
  clubID: string;
  clubName: string;
}

export interface GolfClub {
  clubID: string;
  clubName: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  country: string;
  address: string;
  courses: Array<Course>;
}

export interface Course {
  courseID: string;
  courseName: string;
  svgMap: string;
  latitude?: string;
  longitude?: string;
  scoreCard?: holeInfo[];
}

export interface FormData {
  clubName?: string;
  courseName?: string;
  clubId?: string;
  courseId?: string;
  title?: string;
  subTitle?: string;
  underTitle?: string;
  isHorizontal?: boolean;
  date?: DateTime | null;
  longitude?: string;
  latitude?: string;
  selectedCourseIndex?: number;
  selectedCourseMap?: string;
  courses?: Array<Course>;
  scorecard?: Array<{
    number?: number;
    par?: number;
  }>;
  showScorecard?: boolean;
  colorScheme?: string;
  style?: string;
  wallRender?: boolean;
  quantity: number;
  price: number;
  showCustomTitle?: boolean;
  showDate?: boolean;
  selectedSize?: string;
  isLoadingClub?: boolean;
  isAddingToCart?: boolean;
  hasFrame?: boolean;
  canvasImage?: string;
}

export interface ColorScheme {
  backgroundColor: string;
  textColor: string;
  outlineColor: string;
  compassColor: string;
  scoreCardColor: string;
  fairway: string;
  background: string;
  water: string;
  sand: string;
  green: string;
  tee: string;
  lines: string;
  number: string;
}

export interface ColorSchemes {
  basic: ColorScheme;
  lightBlue: ColorScheme;
  green: ColorScheme;
  darkBlue: ColorScheme;
  brown: ColorScheme;
}

export interface holeInfo {
  holeNumber: number;
  par: number;
  distance: {
    blue?: number;
    white?: number;
    red?: number;
    gold?: number;
  };
}
