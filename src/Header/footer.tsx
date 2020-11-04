import { Button, ButtonType } from 'office-ui-fabric-react';
import React from 'react';
import { LoginContext } from '../contexts';

export function Footer(props: any) {
  return (
    <LoginContext.Consumer>
      {({ isLoggedin }) => (
        <div className="Appfooter">
          <Button
            buttonType={ButtonType.primary}
            disabled={!isLoggedin || props.stage == 0}
            onClick={() => props.setStage(false)}
          >
            Prev
          </Button>
          <Button
            buttonType={ButtonType.primary}
            disabled={!isLoggedin || props.stage > 2}
            onClick={() => props.setStage(true)}
          >
            Next
          </Button>
        </div>
      )}
    </LoginContext.Consumer>
  );
}
