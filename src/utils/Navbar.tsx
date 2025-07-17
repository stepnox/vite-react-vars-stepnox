import './Navbar.css'

interface NavbarProps {
  active: string
  setActive: (page: string) => void
}
function Navbar({ active, setActive }: NavbarProps) {

  return (
    <nav className="d-flex flex-column p-3">
      <h1 className="navbar-brand mb-3">Navbar</h1>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a className={`nav-link${active === 'Dashboard' ? ' active' : ''}`} aria-current="page" href="#" onClick={() => setActive('Dashboard')}>Dashboard</a>
        </li>
        <li>
          <a className={`nav-link${active === 'Data' ? ' active' : ''}`} href="#" onClick={() => setActive('Data')}>Data</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar