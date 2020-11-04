import { Button, ButtonType } from 'office-ui-fabric-react';
import React from 'react';

export function Login(_props: any) {
  return (
    <Button
      buttonType={ButtonType.primary}
      onClick={() => window.location.replace('http://localhost:5000/login')}
    >
      Login
    </Button>
  );
}
