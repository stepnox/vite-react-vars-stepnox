import summary from '../../data/summary2.0.json'
import './Data.css'

const tests = summary.vulnerability_test

function Data() {
    return (
        <>
            {tests.map((item, index) => {
                const data = item.results[0]
                return (
                    <div className="card mt-4" key={index}>
                        <div className="card-header">
                            <h2>Domain: {data.domain_name}</h2>
                            <div className='row justify-content-evenly'>
                                <p className='col-4'>Risk Score: <strong>{data.risk_score}</strong></p>
                                <p className='col-4'>Assets: <strong>{data.n_asset}</strong></p>
                                <p className='col-4'>Unique IPv4: <strong>{data.unique_ipv4}</strong> | Unique IPv6: <strong>{data.unique_ipv6}</strong></p>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <h4>Vulnerabilities</h4>
                                    <ul>
                                        <li>Critical: {data.n_vulns.total.critical}</li>
                                        <li>High: {data.n_vulns.total.high}</li>
                                        <li>Medium: {data.n_vulns.total.medium}</li>
                                        <li>Info: {data.n_vulns.total.info}</li>
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <h4>Data Leaks</h4>
                                    <ul>
                                        <li>Domain Stealer: {data.n_dataleak.total.domain_stealer}</li>
                                        <li>Potential Stealer: {data.n_dataleak.total.potential_stealer}</li>
                                        <li>Other Stealer: {data.n_dataleak.total.other_stealer}</li>
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <h4>Certificates</h4>
                                    <ul>
                                        <li>Active: {data.n_cert_attivi}</li>
                                        <li>Expired: {data.n_cert_scaduti}</li>
                                    </ul>
                                </div>
                                <div className="col-md-3">
                                    <h4>Exposed Ports</h4>
                                    <ul>
                                        {Object.entries(data.n_port).map(([port, info]) => (
                                            <li key={port}>Port {port}: {info.n} exposures</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-12">
                                    <h4>Email Security</h4>
                                    <ul>
                                        <li>Spoofing: {data.email_security.spoofable}</li>
                                        <li>DMARC Policy: {data.email_security.dmarc_policy}</li>
                                        <li>Blacklist Detections: {data.email_security.blacklist_detections}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}


export default Data