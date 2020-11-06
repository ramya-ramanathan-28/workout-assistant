import { Button, ButtonType } from 'office-ui-fabric-react';
import React from 'react';

export function Login(_props: {text: string, onClick?:()=>void;}) {
  return (
    <Button 
    onClick={() => {
      if(_props.onClick){
        _props.onClick()
      } else{
        window.location.replace('http://localhost:5000/login')
      }
      
    }}
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
