import Navbar from './Navbar';
import Home from './Home';
import Tree from './Tree.tsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home/>}>
            </Route>
            <Route exact path='/Tree' element={<Tree/>}>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;