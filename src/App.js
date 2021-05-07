import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header";
import Home from "./Home/Home";
import Donate from "./Donate/Donate";
import Blog from "./Blog/Blog";
import Events from "./Events/Events";
import BlogCreate from "./Blog/BlogCreate";

import BlogPost from "./Blog/BlogPost";
////////////////Admin////////////////////////
import AdminPanel from "./Login/AdminPanel";
import HomeAdmin from "./Home/HomeAdmin";
import DonateAdmin from "./Donate/DonateAdmin";
import BlogAdmin from "./Blog/BlogAdmin";
import EventsAdmin from "./Events/EventsAdmin";
import Login from "./Login/Login";
////////////////Admin////////////////////////

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

        <Route exact path="/blogpost" component={BlogPost} />
        <Route exact path="/asayo" component={TestBackend} />

        {/* ////////////////////Admin/////////////////// */}
        <Route exact path="/admin/panel" component={AdminPanel} />
        <Route exact path="/admin/login" component={Login} />
        <Route exact path="/admin/inicio" component={HomeAdmin} />
        <Route exact path="/admin/donativos" component={DonateAdmin} />
        <Route exact path="/admin/blog" component={BlogAdmin} />
        <Route exact path="/admin/eventos" component={EventsAdmin} />
        {/* ////////////////////Admin/////////////////// */}
      </Router>
    </>
  );
}

export default App;
