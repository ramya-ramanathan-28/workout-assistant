import { Button, ButtonType } from 'office-ui-fabric-react';
import React from 'react';

export function Footer(props: any) {
  return (
    <div className="Appfooter">
      <Button
        buttonType={ButtonType.primary}
        disabled={!props.loggedin || props.stage == 0}
        onClick={() => props.setStage(false)}
      >
        Prev
      </Button>
      <Button
        buttonType={ButtonType.primary}
        disabled={!props.loggedin || props.stage > 2}
        onClick={() => props.setStage(true)}
      >
        Next
      </Button>
    </div>
  );
}
