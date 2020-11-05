import React, { useState } from 'react';
import { STAGES } from './constant';

export const LoginContext = React.createContext({
  isLoggedin: false,
  userName: 'Stranger',
  userEmail: '',
});

export const WorkoutContext = React.createContext({
  format: '1,2,1,2',
  customFormat: '',
  setCustomFormat: (code: string) => {},
  setFormat: (code: string) => {},
  duration: 0,
  setDuration: (duration: number) => {},
  isAllSet: (): boolean => {
    return false;
  },
});

export const WorkoutContextProvider = (props: any) => {
  const [format, setFormat] = React.useState('');
  const [customFormat, setCustomFormat] = React.useState('');
  const [duration, setDuration] = React.useState(30);
  const isAllSet = () => {
    return (format !== '' || customFormat !== '') && duration > 0;
  };
  return (
    <WorkoutContext.Provider
      value={{
        format,
        customFormat,
        setCustomFormat,
        setFormat,
        isAllSet,
        duration,
        setDuration,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};
export const AppStageContext = React.createContext({
  prevStageArr: [-1],
  currentStage: STAGES.LandingPage,
  nextStage: -1,
  nextStageState: true,
  setNextStage: (ns: any) => {},
  gotoStage: (ns: any) => {},
  gotoPrevStage: () => {},
  setnextStageState: (state: boolean) => {},
});
export const AppStageContextProvider = (props: any) => {
  const [prevStageArr, setPrevState] = useState([-1]);
  const [currentStage, setCurrentStage] = useState(STAGES.LandingPage);
  const [nextStage, setNextStage] = useState(-1);
  const [nextStageState, setNextStageState] = useState(true);
  const stagesConfig = {
    prevStageArr: prevStageArr,
    currentStage: currentStage,
    nextStage: nextStage,
    nextStageState: nextStageState,
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
    setnextStageState: (state: boolean) => {
      setNextStageState(state);
    },
  };
  return (
    <AppStageContext.Provider value={stagesConfig}>
      {props.children}
    </AppStageContext.Provider>
  );
};
