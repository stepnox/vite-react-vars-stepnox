import './Navbar.css'
import ReactLogo from '../assets/react.svg'


interface NavbarProps {
  active: string
  setActive: (page: string) => void
}

function Navbar({ active, setActive }: NavbarProps) {

  return (
    <nav className="d-flex flex-column p-3">
      <h2 className="navbar-brand mb-3 justify-content-center">
        <img src={ReactLogo} alt="React" style={{ width: 36, height: 36, margin: 4, verticalAlign: 'middle' }} />
        V.A.R Viewer
      </h2>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item row my-2">
          <button className={`nav-link${active === 'Domini' ? ' active' : ''}`} style={{ 'color': 'white' }} onClick={() => setActive('Domini')}><i className="fas fa-address-book mx-2"></i>Domini</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar