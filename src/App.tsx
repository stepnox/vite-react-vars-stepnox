import { useState } from 'react'
import './App.css'
import Navbar from './utils/Navbar.tsx'
import Dashboard from './home/Dashboard.tsx'
import Report from './home/Report.tsx'
import Certificati from './home/Certificati.tsx'


function App() {
  const [page, setPage] = useState<{ name: string; itemId: string }>({ name: 'Dashboard', itemId: '' })

  return (
    <>
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
          <Navbar
            active={page.name}
            setActive={name => setPage({ name, itemId: '' })}
          />        <div className="content container-fluid p-4" style={{ marginLeft: '300px',overflowY: 'auto', }}>
          <h1>{page.name === 'Certificati' ? `${page.name} SSL` : page.name}</h1>
          {page.name === 'Dashboard' && <Dashboard setActivePage={(name, itemId) => setPage({ name, itemId })}/>}
          {page.name === 'Report' && <Report itemId={page.itemId} setActivePage={(name, itemId) => setPage({ name, itemId })} />}
          {page.name === 'Certificati' && <Certificati itemId={page.itemId} />}
        </div>
      </div>
    </>
  )
}

export default App
