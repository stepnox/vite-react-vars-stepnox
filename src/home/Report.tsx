import { Bar } from 'react-chartjs-2'
import summary from '../../data/summary2.0.json'
import './Report.css'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const tests = summary.vulnerability_test

interface ReportProps {
  itemId: string
  setActivePage: (name: string, itemId: string) => void
}


function Report({itemId, setActivePage}: ReportProps) {
    const item = tests.find(item => item.test_id === itemId);
    if (!item) {
        return <div className="alert alert-warning">Nessun report trovato con id {itemId}.</div>;
    }
    const data = item.results[0];
    const vuln_data = {
        labels: ['Critiche', 'Alte', 'Medie', 'Info'],
        datasets: [
            {
                label: 'Vulnerabilità',
                data: [
                    data.n_vulns.total.critical,
                    data.n_vulns.total.high,
                    data.n_vulns.total.medium,
                    data.n_vulns.total.info
                ],
                backgroundColor: [
                    '#dc3545',
                    '#fd7e14',
                    '#ffc107',
                    '#0d6efd'
                ]
            }
        ]
    };
    return (
        <div className="row mt-4" key={item.test_id}>
            <div className="card col-md-5">
                <div className='card-body'>
                    <h2>Domain: {data.domain_name}</h2>
                    <div className='row justify-content-evenly my-3'>
                        <p className='col-4'>Punteggio Rischio: <strong>{data.risk_score}/100</strong></p>
                        <p className='col-3'>Assets: <strong>{data.n_asset}</strong></p>
                        <p className='col-5'>Unique IPv4: <strong>{data.unique_ipv4}</strong> | Unique IPv6: <strong>{data.unique_ipv6}</strong></p>
                    </div>
                    <h4 className='text-center'>Data Leaks</h4>
                    <div className='row justify-content-evenly my-3'>
                        <p className='col-4'>Domain Stealer: <strong>{data.n_dataleak.total.domain_stealer}</strong></p>
                        <p className='col-4'>Potential Stealer: <strong>{data.n_dataleak.total.potential_stealer}</strong></p>
                        <p className='col-4'>Other Stealer: <strong>{data.n_dataleak.total.other_stealer}</strong></p>
                    </div>
                    <h4 className='text-center'>Email Security</h4>
                    <div className='row justify-content-evenly my-3'>
                        <p className='col-4'>Spoofing: {data.email_security.spoofable}</p>
                        <p className='col-4'>DMARC Policy: {data.email_security.dmarc_policy}</p>
                        <p className='col-4'>Rilevamenti Blacklist: {data.email_security.blacklist_detections}</p>
                    </div>
                </div>
            </div>
            <div className="card col-md-6">
                <div className='card-body'>
                    <h4>Vulnerailità rilevate</h4>
                    <Bar data={vuln_data} />
                </div>
            </div>
            <div className="card col-md-5">
                <div className='card-body'>
                    <h4>Certificati</h4>
                    <ul>
                        <li>Attivi: {data.n_cert_attivi}</li>
                        <li>Scaduti: {data.n_cert_scaduti}</li>
                    </ul>
                    <button className='btn btn-primary' onClick={() => setActivePage('Certificati', itemId)}> Visualizza Certificati</button>
                </div>
            </div>
            <div className="card col-md-6">
                <div className='card-body'>
                    <h4>Exposed Ports</h4>
                    <ul>
                        {Object.entries(data.n_port).map(([port, info]) => (
                            <li key={port}>Port {port}: {info.n} esposizioni rilevate</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default Report



