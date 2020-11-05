import React, { useContext, useState } from 'react';
import { WorkoutContext } from '../../contexts';

export function CreateGraph() {
  const workoutContext = useContext(WorkoutContext);
  const [customformat, setCustomformat] = useState(workoutContext.customFormat);
  workoutContext.setCustomFormat(customformat);
  return (
    <div>
      Input Your Pattern
      <input
        value={customformat}
        onChange={(e) => setCustomformat(e.target.value)}
      ></input>
    </div>
  );
}
