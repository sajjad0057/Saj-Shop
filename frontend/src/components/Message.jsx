import React from "react";
import { Alert } from "react-bootstrap";

function Message({variant,children}) {
  return (
    <Alert variant={variant}>
      <Alert.Heading>Message : </Alert.Heading>
        <hr/>
        {children}
    </Alert>
  );
}

export default Message;
