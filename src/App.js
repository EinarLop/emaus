import "./index.css";
import Header from "./Components/Header";
import Home from "./Home/Home";
import Donate from "./Donate/Donate";
import Blog from "./Blog/Blog";
import Events from "./Events/Events";
import BlogCreate from "./Blog/BlogCreate";
import Login from "./Login/Login";
import BlogPost from "./Blog/BlogPost";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestBackend from "./TestBackend";

function App() {
  return (
    <>
      <Router>
        <Header />
        {/* <TestBackend/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/donativos" component={Donate} />
        <Route exact path="/eventos" component={Events} />
        <Route exact path="/cblog" component={BlogCreate} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/blogpost" component={BlogPost} />
        <Route exact path="/asayo" component={TestBackend} />
      </Router>
    </>
  );
}

export default App;
