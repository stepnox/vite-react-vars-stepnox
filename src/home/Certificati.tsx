import summary from '../../data/summary2.0.json'
import './Certificati.css'


interface CertificatiProps {
  itemId: string
}

function Certificati({ itemId }: CertificatiProps) {
  const item = summary.vulnerability_test.find(item => item.test_id === itemId)
  if (!item) {
    return <div className="alert alert-warning">Nessun report trovato con id {itemId}.</div>
  }
  const data = item.results[0]
  const certificates = data.certificates || []

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>{data.domain_name}</h3>
      </div>
      <div className="card-body">
        {certificates.length === 0 ? (
          <p>Nessun certificato trovato per report {itemId}.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fornitore</th>
                <th>Soggetto</th>
                <th>Scadenza</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, idx) => (
                <tr key={idx}>
                  <td>{cert.issuer}</td>
                  <td>{cert.subject}</td>
                  <td>{cert.expires}</td>
                  <td>
                    <span className={cert.status === 'active' ? 'text-success' : 'text-danger'}>
                      {cert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Certificati