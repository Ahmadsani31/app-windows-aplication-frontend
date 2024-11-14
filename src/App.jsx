import './App.css'


import { Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {


  return (
    <Routes>
      <Route
        index
        path='/'
        element={
          <Home />
        }
      />
    </Routes>
  )
}

export default App
