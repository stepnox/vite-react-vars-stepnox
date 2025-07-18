import { useState } from 'react'
import './App.css'
import Navbar from './utils/Navbar.tsx'
import Report from './report/Report.tsx'
import Certificati from './certificati/Certificati.tsx'
import Domini from './domini/Domini.tsx'


function App() {
  const [page, setPage] = useState<{ name: string; itemId: string }>({ name: 'Domini', itemId: '' })

  return (
    <>
      <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        <Navbar
          active={page.name}
          setActive={name => setPage({ name, itemId: '' })}
        />        <div className="content container-fluid p-4" style={{ marginLeft: '300px', overflowY: 'auto', }}>
          <h1>{page.name === 'Certificati' ? `${page.name} SSL` : page.name}</h1>
          {page.name === 'Report' && <Report itemId={page.itemId} setActivePage={(name, itemId) => setPage({ name, itemId })} />}
          {page.name === 'Certificati' && <Certificati itemId={page.itemId} />}
          {page.name === 'Domini' && <Domini setActivePage={(name, itemId) => setPage({ name, itemId })} />}
        </div>
      </div>
    </>
  )
}

export default App
