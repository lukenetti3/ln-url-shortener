import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function SharedURL(props) {
  console.log(props.link);
  return (
    <Router>
      <div>
        <Switch>
          <Route
            path={`/${props.link.name}`}
            render={() => (window.location.href = props.link.url)}
          />
        </Switch>
      </div>
    </Router>
  );
}
