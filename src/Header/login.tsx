import { Button, ButtonType } from 'office-ui-fabric-react';
import React from 'react';

export function Login(_props: {text: string}) {
  return (
    <Button 
    onClick={() => window.location.replace('http://localhost:5000/login')}
    styles={{root:{
      borderRadius: "15px",
      backgroundColor: "white",
      fontWeight: 600,
      color: "black",
    }}}>
      {_props.text}
    </Button>
  );
}
