import "../../App.css";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../SignUp";
import ErrorPage from "../ErrorPage";

function App() {
  return (
    <div>
      <Header></Header>
      <Welcome></Welcome>
      <Login></Login>
      <Signup></Signup>
      <ErrorPage></ErrorPage>
      <Landing></Landing>
      <Footer></Footer>
    </div>
  );
}

export default App;
