import './Dashboard.css'
import summary from '../../data/summary2.0.json'

const tests = summary.vulnerability_test

interface DashboardProps {
  setActivePage: (name: string, itemId: string) => void
}

const Dashboard = ({setActivePage}: DashboardProps) => {
  return (
    <div className="dashboard">
      <p>Welcome to the dashboard. Here you can find an overview of your reports.</p>
      <ul>
        {tests.map(test => (
          <li key={test.test_id}>
            <button onClick={() => setActivePage('Report', test.test_id)}>{test.results[0].domain_name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard