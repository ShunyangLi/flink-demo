import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import loadable from "./utils/loadable";
import "animate.css";
import "./style/base.scss";
import "./style/App.scss";

// 公共模块
const DefaultLayout = loadable(() =>
  import(/* webpackChunkName: 'default' */ "./containers")
);

// 基础页面
const View404 = loadable(() =>
  import(/* webpackChunkName: '404' */ "./views/Others/404")
);
const View500 = loadable(() =>
  import(/* webpackChunkName: '500' */ "./views/Others/500")
);

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/index" />} />
      <Route path="/500" component={View500} />
      <Route path="/404" component={View404} />
      <Route component={DefaultLayout} />
    </Switch>
  </Router>
);

export default App;
