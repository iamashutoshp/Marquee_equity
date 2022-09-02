import HomePage from "./containers/HomePage/HomePage";
import AddCompany from "./containers/AddCompany/AddCompany";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddCompany />} />
      </Routes>
    </Router>
  );
}

export default App;
