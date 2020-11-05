import { Button, ButtonType } from 'office-ui-fabric-react';
import React, { useContext } from 'react';
import { AppStageContext, LoginContext } from '../contexts';

export function Footer(props: any) {
  const { isLoggedin } = useContext(LoginContext);
  const appStageContext = useContext(AppStageContext);
  return (
    <div className="Appfooter">
      <Button
        buttonType={ButtonType.primary}
        disabled={!isLoggedin || appStageContext.prevStageArr.length == 1}
        onClick={appStageContext.gotoPrevStage}
      >
        Prev
      </Button>
      <Button
        buttonType={ButtonType.primary}
        disabled={!isLoggedin || appStageContext.nextStage == -1}
        onClick={() => {
          appStageContext.gotoStage(appStageContext.nextStage);
        }}
      >
        Next
      </Button>
    </div>
  );
}
