import "../../App.css";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../SignUp";
import ErrorPage from "../ErrorPage";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>

      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/welcome" exact component={Welcome}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route component={ErrorPage}></Route>
      </Switch>

      <Footer></Footer>
    </Router>
  );
}

export default App;
