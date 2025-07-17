import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './utils/Navbar.tsx'
import Dashboard from './home/Dashboard.tsx'
import Data from './home/Data.tsx'


function App() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'Dashboard'
  })

  useEffect(() => {
    localStorage.setItem('activePage', activePage)
  }, [activePage])

  return (
    <>
      <div className="d-flex" >
      <Navbar active={activePage} setActive={setActivePage} />
        <div className="content container-fluid p-4">
          <h1>{activePage}</h1>
          {activePage === 'Dashboard' && <Dashboard />}
          {activePage === 'Data' && <Data />}
        </div>
      </div>
    </>
  )
}

export default App
