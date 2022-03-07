import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";
import Apex from "./components/Apex";
import ChartJS from "./components/ChartJS";
import D3 from "./components/D3";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/apex">Apex</Link>
            </li>
            <li>
              <Link to="/d3">D3</Link>
            </li>
			<li>
				<Link to="/chartjs">ChartJS </Link>
			</li>
          </ul>
        </nav>

        <Switch>
			<Route path='/apex' element={<Apex/>} />
			<Route path='/d3' element={<D3/>} />
			<Route path='/chartjs' element={<ChartJS />} />
        </Switch>
      </div>
    </Router>
  );
}