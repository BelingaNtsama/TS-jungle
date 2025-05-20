import { Routes, Route } from 'react-router'
import './App.css'

// Import your components (create these components in separate files)
import Home from './pages/Home'
import NotFound from './pages/NotFound'


function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;