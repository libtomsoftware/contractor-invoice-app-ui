import React from "react";
import history from "../../providers/history.js";
import "./page-home.css";
class PageHome extends React.Component {
  routeTo(path) {
    history.push(path);
  }

  render() {
    return <div className="page page-home">home page</div>;
  }
}

export default PageHome;
