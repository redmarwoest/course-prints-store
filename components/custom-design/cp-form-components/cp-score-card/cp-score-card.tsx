import { useEffect, useState } from "react";
import styles from "./cp-score-card.module.scss";

interface Hole {
  number: number;
  par: number;
  strokes?: number;
  distance: number;
}

interface ScoreCardProps {
  numHoles: number;
  pars: number[];
  distance: number[];
}

const CpScoreCard = ({
  numHoles = 0,
  pars = [],
  distance = [],
}: ScoreCardProps) => {
  const [holes, setHoles] = useState<Hole[]>([]);

  useEffect(() => {
    if (!numHoles || !pars.length || !distance.length) return;

    const initialHoles = Array.from({ length: numHoles }, (_, i) => ({
      number: i + 1,
      par: pars[i] || 4,
      strokes: undefined,
      distance: distance[i] || 0,
    }));
    setHoles(initialHoles);
  }, [numHoles, pars, distance]);

  // Calculate total meters and total pars
  const totalPar = holes.reduce((total, hole) => total + hole.par, 0);
  const totalDistance = holes.reduce((total, hole) => total + hole.distance, 0);

  const renderScoreTable = () => {
    return (
      <div className={styles.scorecard__container}>
        <h2>Scorecard</h2>
        <table className={styles.scorecard__table}>
          <thead>
            <tr>
              <th>Hole</th>
              <th>Par</th>
              <th>Score</th>
              <th>Meter</th>
            </tr>
          </thead>
          <tbody>
            {holes.map((hole) => (
              <tr key={hole.number}>
                <td>{hole.number}</td>
                <td>{hole.par}</td>
                <td></td>
                <td>{hole.distance}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td>{totalPar}</td>
              <td>{totalDistance}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return <div className={styles.scorecard}>{renderScoreTable()}</div>;
};

export default CpScoreCard;
