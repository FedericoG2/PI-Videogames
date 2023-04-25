import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { Home, LandingPage, Form, Detail } from "./views";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route path="/detail/:idVideogame" component={Detail} />
      <Route path="/form" component={Form} />
    </div>
  );
}

export default App;
