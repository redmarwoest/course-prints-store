"use client";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./cp-hole-manager.module.scss";

interface HoleManagerProps {
  courseIndex: number;
  scoreCard: Array<{
    holeNumber: number;
    par: number;
    distance: {
      blue?: number;
      white?: number;
      red?: number;
      gold?: number;
    };
  }>;
  onUpdate: (scoreCard: HoleManagerProps["scoreCard"]) => void;
}

const CpHoleManager = ({ scoreCard, onUpdate }: HoleManagerProps) => {
  const [holes, setHoles] = useState(scoreCard);
  const [numHoles, setNumHoles] = useState(scoreCard.length === 9 ? 9 : 18);

  useEffect(() => {
    setHoles(scoreCard);
    setNumHoles(scoreCard.length === 9 ? 9 : 18);
  }, [scoreCard]);

  const handleNumHolesChange = (
    _event: React.MouseEvent<HTMLElement>,
    newNumHoles: number
  ) => {
    if (newNumHoles !== null) {
      setNumHoles(newNumHoles);
      const newHoles = Array(newNumHoles)
        .fill(0)
        .map((index) => {
          const existingHole = holes[index];
          return (
            existingHole || {
              holeNumber: index + 1,
              par: 4,
              distance: {
                blue: 0,
                white: 0,
                red: 0,
                gold: 0,
              },
            }
          );
        });
      setHoles(newHoles);
      onUpdate(newHoles);
    }
  };

  const handleUpdate = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedHoles = [...holes];
    if (field.startsWith("distance.")) {
      const [_, teeType] = field.split(".");
      if (updatedHoles[index]) {
        updatedHoles[index] = {
          holeNumber: updatedHoles[index].holeNumber || index + 1,
          par: updatedHoles[index].par || 4,
          distance: {
            ...updatedHoles[index].distance,
            // [teeType]: Number(value),
          },
        };
      } else {
        // updatedHoles[index] = {
        // // ...updatedHoles[index],
        // [field]: Number(value),
      }
    }
    setHoles(updatedHoles);
    onUpdate(updatedHoles);
  };

  return (
    <div className={styles["hole-manager"]}>
      <Box className={styles["hole-manager__header"]}>
        <Typography variant="h6" className={styles["hole-manager__title"]}>
          Hole Details
        </Typography>
        <ToggleButtonGroup
          value={numHoles}
          exclusive
          onChange={handleNumHolesChange}
          aria-label="number of holes"
          size="small"
        >
          <ToggleButton value={9} aria-label="9 holes">
            9 Holes
          </ToggleButton>
          <ToggleButton value={18} aria-label="18 holes">
            18 Holes
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles["hole-manager__table"]}>
        <table>
          <thead>
            <tr>
              <th>Hole</th>
              <th>Par</th>
              <th>Blue</th>
              <th>White</th>
              <th>Red</th>
              <th>Gold</th>
            </tr>
          </thead>
          <tbody>
            {holes.slice(0, numHoles).map((hole, index) => (
              <tr key={index}>
                <td>{hole.holeNumber}</td>
                <td>
                  <TextField
                    type="number"
                    value={hole.par}
                    onChange={(e) => handleUpdate(index, "par", e.target.value)}
                    size="small"
                    inputProps={{ min: 3, max: 5 }}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    value={hole.distance.blue || ""}
                    onChange={(e) =>
                      handleUpdate(index, "distance.blue", e.target.value)
                    }
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    value={hole.distance.white || ""}
                    onChange={(e) =>
                      handleUpdate(index, "distance.white", e.target.value)
                    }
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    value={hole.distance.red || ""}
                    onChange={(e) =>
                      handleUpdate(index, "distance.red", e.target.value)
                    }
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </td>
                <td>
                  <TextField
                    type="number"
                    value={hole.distance.gold || ""}
                    onChange={(e) =>
                      handleUpdate(index, "distance.gold", e.target.value)
                    }
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </div>
  );
};

export default CpHoleManager;
