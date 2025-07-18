import summary from '../../data/summary2.0.json'
import './Domini.css'


interface DominiProps {
    setActivePage: (name: string, itemId: string) => void
}

const Domini = ({ setActivePage }: DominiProps) => {
    const tests = summary.vulnerability_test || []

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h3>Lista Report</h3>
            </div>
            <div className="card-body">
                {tests.length === 0 ? (
                    <p>Nessun report disponibile.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Dominio</th>
                                <th>Azioni</th>
                                <th>Data Creazione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test, idx) => (
                                <tr key={test.test_id}>
                                    <td>{idx + 1}</td>
                                    <td>{test.results[0].domain_name}</td>
                                    <td> <button onClick={() => setActivePage('Report', test.test_id)}><i className="fas fa-file ms-2" ></i> Visualizza Report</button>
                                    </td>
                                    <td>{test.results[0].creation_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Domini