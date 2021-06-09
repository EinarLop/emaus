import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import Header from "./Components/Header";
import Home from "./Home/Home";
import Donate from "./Donate/Donate";
import Blog from "./Blog/Blog";
import Events from "./Events/Events";
import BlogCreate from "./Blog/BlogCreate";
import EventCreate from "./Events/EventCreate";

import BlogPost from "./Blog/BlogPost";
import EventPost from "./Events/EventPost";

////////////////Admin////////////////////////
import AdminPanel from "./Login/AdminPanel";
import HomeAdmin from "./Home/HomeAdmin";
import DonateAdmin from "./Donate/DonateAdmin";
import BlogAdmin from "./Blog/BlogAdmin";
import EventsAdmin from "./Events/EventsAdmin";
import Login from "./Login/Login";
import VolunteerAdmin from "./Donate/VolunteerAdmin";
////////////////Admin////////////////////////

const background = {
  backgroundColor: "#ffffff",

  backgroundImage:
    "radial-gradient(#dfe0f0 1.35px, transparent 1.35px), radial-gradient(#dfe0f0 1.35px, #ffffff 1.35px)",
  backgroundSize: "54px 54px",
  backgroundPosition: "0 0,27px 27px",
};

function App() {
  return (
    <div style={background}>
      <Router>
        <Header />
        {/* <TestBackend/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/donativos" component={Donate} />
        <Route exact path="/eventos" component={Events} />

        <Route exact path="/blogpost/:id" component={BlogPost} />
        <Route exact path="/eventos/:id" component={EventPost} />
        {/* <Route exact path="/asayo" component={TestBackend} /> */}

        {/* ////////////////////Admin/////////////////// */}
        <Route exact path="/admin/panel" component={AdminPanel} />
        <Route exact path="/admin/login" component={Login} />
        <Route exact path="/admin/inicio" component={HomeAdmin} />
        <Route exact path="/admin/donativos" component={DonateAdmin} />
        <Route exact path="/admin/blog" component={BlogAdmin} />
        <Route exact path="/admin/eventos" component={EventsAdmin} />
        <Route exact path="/admin/crear/blog" component={BlogCreate} />
        <Route exact path="/admin/crear/evento" component={EventCreate} />
        <Route exact path="/admin/voluntarios" component={VolunteerAdmin} />
        {/* ////////////////////Admin/////////////////// */}
      </Router>
    </div>
  );
}

export default App;
