import React, { useState } from 'react';
import { STAGES } from './constant';

export const LoginContext = React.createContext({
  isLoggedin: false,
  userName: 'Stranger',
  userEmail: '',
});

export const AppStageContext = React.createContext({
  prevStageArr: [-1],
  currentStage: STAGES.LandingPage,
  nextStage: -1,
  setNextStage: (ns: any) => {},
  gotoStage: (ns: any) => {},
  gotoPrevStage: () => {},
});

export const WorkoutContext = React.createContext({
  format: "1,2,1,2",
  setFormat: (code: string) => {},
});

export const WorkoutContextProvider = (props: any)=>{
  const [format, setFormat] = React.useState("1,2,1,2");

  return (
  <WorkoutContext.Provider value={{
    format,
    setFormat
  }}>
    {props.children}
  </WorkoutContext.Provider>
  )};

export const AppStageContextProvider = (props: any) => {
  const [prevStageArr, setPrevState] = useState([-1]);
  const [currentStage, setCurrentStage] = useState(STAGES.LandingPage);
  const [nextStage, setNextStage] = useState(-1);
  const stagesConfig = {
    prevStageArr: prevStageArr,
    currentStage: currentStage,
    nextStage: nextStage,
    setNextStage: (ns: any) => {
      setNextStage(ns);
    },
    gotoStage: (ns: any) => {
      const prevStageArr1 = [...prevStageArr];
      prevStageArr1.push(currentStage);
      setPrevState(prevStageArr1);
      setNextStage(-1);
      setCurrentStage(ns);
    },
    gotoPrevStage: () => {
      const prevStageArr1 = [...prevStageArr];
      const currentStage1 = prevStageArr.pop() as STAGES;
      setPrevState(prevStageArr);
      setNextStage(-1);
      setCurrentStage(currentStage1);
    },
  };
  return (
    <AppStageContext.Provider value={stagesConfig}>
      {props.children}
    </AppStageContext.Provider>
  );
};
