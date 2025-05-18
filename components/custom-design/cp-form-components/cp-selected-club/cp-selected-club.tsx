import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Course, GolfClub } from "../../../../app/types/types";
import { exampleMap } from "./cp-example-map";

const CpSelectedClub = ({
  selectedClub,
  selectedCourseIndex,
  handleCourseSelect,
  updateFormData,
}: {
  selectedClub: GolfClub;
  selectedCourseIndex: number;
  handleCourseSelect: (index: number) => void;
  updateFormData: (updates: { selectedCourseMap: string }) => void;
}) => {
  const [mapAlertOpen, setMapAlertOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [exampleMapRendered, setExampleMapRendered] = useState(false);

  useEffect(() => {
    if (selectedClub?.courses?.[selectedCourseIndex]?.svgMap === "") {
      setMapAlertOpen(true);
    }
  }, [selectedClub?.courses, selectedCourseIndex]);

  return (
    <div className="cp-card">
      <h3 className="h3 mb-8">{selectedClub.clubName}</h3>
      <p className="p">
        {selectedClub.address}{" "}
        {`${selectedClub.city}, ${selectedClub.state} ${selectedClub.country}`}
      </p>
      {selectedClub.courses && selectedClub.courses.length > 1 && (
        <div>
          <h4>Select Course</h4>
          <div>
            {selectedClub.courses.map((course: Course, index: number) => (
              <button
                key={index}
                type="button"
                className={`cp-button mr-8 ${
                  selectedCourseIndex === index ? "cp-button__active" : ""
                }`}
                onClick={() => handleCourseSelect(index)}
              >
                {course.courseName}
              </button>
            ))}
          </div>
        </div>
      )}
      <Snackbar
        open={mapAlertOpen}
        autoHideDuration={null}
        onClose={() => setMapAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{ clickAwayListener: { mouseEvent: false } }}
      >
        <div className="cp-alert">
          <p className="h3">
            This course does not have a map yet. Is this your course?
          </p>
          <div className="mt-16">
            <button
              className="cp-button cp-button__active mr-8"
              onClick={(e) => {
                e.preventDefault();
                setMapAlertOpen(false);
                setExampleMapRendered(true);
                updateFormData({ selectedCourseMap: exampleMap });
              }}
            >
              Yes, this is my course
            </button>
            <button
              className="cp-button"
              onClick={(e) => {
                e.preventDefault();
                setMapAlertOpen(false);
                setContactDialogOpen(true);
              }}
            >
              No, it is not
            </button>
          </div>
        </div>
      </Snackbar>

      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        disableEscapeKeyDown
        onBackdropClick={(e) => e.preventDefault()}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "400px",
            maxWidth: "600px",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            border: "2px solid #000",
            padding: "24px",
          },
          "& .MuiDialogTitle-root": {
            fontSize: "24px",
            fontWeight: "bold",
            paddingBottom: "16px",
            borderBottom: "1px solid #eee",
          },
          "& .MuiDialogContent-root": {
            padding: "24px 0",
            fontSize: "16px",
            lineHeight: "1.5",
          },
          "& .MuiDialogActions-root": {
            padding: "16px",
            borderTop: "1px solid #eee",
          },
        }}
      >
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          Please get in touch with us to help us find the correct map for your
          course.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setContactDialogOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={exampleMapRendered}
        onClose={() => setExampleMapRendered(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div className="cp-alert">
          <p className="h3">We are rendering an example map for the view.</p>
        </div>
      </Snackbar>
    </div>
  );
};

export default CpSelectedClub;
