import { Bar, Pie } from 'react-chartjs-2'
import { useState } from 'react'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { getPortBarData, getDataleakData, portBarOptions, dataleakOptions, formatSummaryText } from '../utils/Methods.ts'
import summary from '../../data/summary2.0.json'
import './Report.css'
import EmailSecurityModal from '../utils/EmailSecurityModal.tsx'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const tests = summary.vulnerability_test

interface ReportProps {
    itemId: string
    setActivePage: (name: string, itemId: string) => void
}



function Report({ itemId, setActivePage }: ReportProps) {
    const item = tests.find(item => item.test_id === itemId);
    const [showModal, setShowModal] = useState(false);

    if (!item) {
        return <div className="alert alert-warning">Nessun report trovato con id {itemId}.</div>;
    }

    const data = item.results[0];

    const portBarData = getPortBarData(data);
    const dataleakData = getDataleakData(data);

    return (
        <div className="row mt-4 justify-content-center" key={item.test_id}>
            {item.status === "success" ? (<>
                <h2 className='text-center mb-3'><i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i> Report generato con successo</h2>


                <div className="card col-md-2">
                    <div className='card-body align-content-center'>
                        <h5>Totale Rischio:</h5>
                        <h2 className='text-center w-100' ><strong>{data.risk_score}/100</strong>
                            {parseInt(data.risk_score) > 50 ? (
                                <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                            ) : (
                                <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                            )}
                        </h2>
                    </div>
                </div>
                <div className="card col-md-5">
                    <div className='card-body align-content-center'>
                        <h5>Dominio:</h5>
                        <h3 className='text-center w-100' ><strong>{data.domain_name}</strong>
                            {parseInt(data.risk_score) > 50 ? (
                                <i className="fas fa-exclamation-triangle text-danger ms-2"> Esposizione rischi alta</i>
                            ) : (
                                <i className="fas fa-check-circle text-success ms-2"> Esposizione rischi bassa</i>
                            )}
                        </h3>
                    </div>
                </div>
                <div className="card col-md-4">
                    <div className='card-body align-content-center'>
                        <h5>Generato:</h5>
                        <h4 className='text-center w-100' ><strong>{data.creation_date}</strong></h4>
                        <h5>Ultimo aggiornamento:</h5>
                        <h4 className='text-center w-100' ><strong>{data.last_edit}</strong></h4>
                    </div>
                </div>
                <div className="card col-md-11">
                    <div className='card-body align-content-center'>
                        <p className='text-center w-100' dangerouslySetInnerHTML={{ __html: formatSummaryText(data.summary_text) }} />
                    </div>
                </div>

                <div className="card col-md-11">
                    <div className='card-body justify-content-evenly row'>
                        <div className='col-3 text-center'>
                            <h6>Certificati attivi:</h6>
                            <h4 className='w-100' ><strong>{data.n_cert_attivi}</strong></h4>
                        </div>
                        <div className='col-3 text-center'>
                            <h6>Certificati scaduti:</h6>
                            <h4 className='text-center w-100' ><strong>{data.n_cert_scaduti}</strong></h4>
                        </div>
                        <div className='col-3 text-center'>
                            <h6>Rischio Esposizione Certificati:</h6>
                            <h4 className='text-center w-100' ><strong>{data.certificate_score}/100</strong>
                                {(data.certificate_score ?? 0) > 50 ? (
                                    <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                                ) : (
                                    <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                                )}</h4>
                        </div>
                        <div className='col-3 text-center align-content-center'>
                            <button className='btn btn-primary' onClick={() => setActivePage('Certificati', itemId)}><i className="fas fa-list ms-2" ></i> Visualizza Certificati</button>
                        </div>
                    </div>
                </div>
                <div className="card col-md-11">
                    <div className='card-body justify-content-evenly row'>
                        <div className='col-3 text-center align-content-center'>
                            <h3>Sicurazza Email:</h3>
                        </div>
                        <div className='col-3 text-center'>
                            <h5>Punteggio Rischio Spoofing:</h5>
                            <h2 className='text-center w-100' ><strong>{data.spoofing_score}/100</strong></h2>
                        </div>
                        <div className='col-3 text-center'>
                            <h5>Punteggio Perdita dati Email:</h5>
                            <h2 className='text-center w-100' ><strong>{data.rapporto_leak_email_score}/100</strong>
                                {(data.rapporto_leak_email_score) ?? 0 > 50 ? (
                                    <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                                ) : (
                                    <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                                )}</h2>
                        </div>
                        <div className='col-3 text-center align-content-center'>
                            <button className='btn btn-primary' onClick={() => setShowModal(true)}><i className="fas fa-eye ms-2" ></i> Visualizza Dettagli</button>
                        </div>
                    </div>
                </div>
                <EmailSecurityModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    emailSecurity={data.email_security}
                />
                <div className="card col-md-8 ">
                    <div className='card-body justify-content-evenly row'>
                        <div className='col-5 text-center align-content-center'>
                            <h3>Indirizzi ip scansionati:</h3>
                        </div>
                        <div className='col-3 text-center'>
                            <h6>IPV4:</h6>
                            <h4 className='text-center w-100' ><strong>{data.unique_ipv4}</strong></h4>
                        </div>
                        <div className='col-3 text-center'>
                            <h6>IPV6:</h6>
                            <h4 className='text-center w-100' ><strong>{data.unique_ipv6}</strong></h4>
                        </div>
                    </div>
                </div>
                <div className="card col-md-3">
                    <div className='card-body align-content-center text-center'>
                        <h5>Domini simili identificati:</h5>
                        <h2 className='text-center w-100' ><strong>{data.n_similar_domains}</strong></h2>
                    </div>
                </div>
                <div className="card col-md-8 ">
                    <div className='card-body justify-content-evenly row'>
                        <div className='col-4 text-center align-content-center'>
                            <h3>CDN (Content Delivery Network):</h3>
                        </div>
                        <div className='col-2 text-center align-content-center'>
                            <h6>Localizzati:</h6>
                            <h4 className='text-center w-100' ><strong>{data.cdn.count}</strong></h4>
                        </div>
                        <div className='col-5 text-center'>
                            <h6>Asset Protetti:</h6>
                            <ul className='text-center w-100' >
                                {data.cdn.assets.map((asset, index) => (
                                    <li key={index}>{asset}</li>
                                ))} || <li>Nessun asset localizzato</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card col-md-3">
                    <div className='card-body align-content-center text-center'>
                        <h5>Asset presenti:</h5>
                        <h2 className='text-center w-100' ><strong>{data.n_asset}</strong></h2>
                    </div>
                </div>
                <div className="card col-md-8 ">
                    <div className='card-body justify-content-evenly row'>
                        <div className='col-4 text-center align-content-center'>
                            <h3>WAF (Web Application Firewall):</h3>
                        </div>
                        <div className='col-2 text-center align-content-center'>
                            <h6>Localizzati:</h6>
                            <h4 className='text-center w-100' ><strong>{data.waf.count}</strong></h4>
                        </div>
                        <div className='col-5 text-center'>
                            <h6>Asset Protetti:</h6>
                            <ul className='text-center w-100' >
                                {data.waf.assets.map((asset, index) => (
                                    <li key={index}>{asset}</li>
                                ))} || <li>Nessun asset localizzato</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card col-md-3">
                    <div className='card-body align-content-center text-center'>
                        <h5>Punteggio Rischio servizi esposti:</h5>
                        <h2 className='text-center w-100' ><strong>{data.servizi_esposti_score}/100</strong>
                            {(data.servizi_esposti_score ?? 0) > 50 ? (
                                <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                            ) : (
                                <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                            )}</h2>
                    </div>
                </div>
                <div className='card col-md-11 my-3'>
                    <div className='card-body'>
                        <h4 className='text-center'>Perdite dati</h4>
                        <Bar data={dataleakData} options={dataleakOptions} />
                    </div>
                    <div className="card-body row justify-content-evenly text-center">
                        <div className='align-content-center'>
                            <h5>Punteggio perdita dati:</h5>
                            <h2 className='text-center w-100' ><strong>{data.dataleak_score}/100</strong>
                                {(data.dataleak_score ?? 0) > 50 ? (
                                    <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                                ) : (
                                    <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                                )}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="card col-md-11 my-3">
                    <div className="card-body row justify-content-evenly">
                        <div className="mb-3 col-md-3">
                            <h4 className="text-center">Vulnerabilità rilevate (Totali)</h4>
                            <Pie
                                data={{
                                    labels: ['Critiche', 'Alte', 'Medie', 'Info'],
                                    datasets: [
                                        {
                                            data: [data.n_vulns.total.critical, data.n_vulns.total.high, data.n_vulns.total.medium, data.n_vulns.total.info],
                                            backgroundColor: [
                                                '#dc3545',
                                                '#fd7e14',
                                                '#ffc107',
                                                '#0d6efd',
                                            ],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: { position: 'top' as const },
                                        title: { display: false },
                                    },
                                }}
                            />
                        </div>
                        <div className="card-mb-3 col-md-3">
                            <h4 className="text-center">Vulnerabilità Attive</h4>
                            <Pie
                                data={{
                                    labels: ['Critiche', 'Alte', 'Medie', 'Info'],
                                    datasets: [
                                        {
                                            data: [data.n_vulns.active.critical, data.n_vulns.active.high, data.n_vulns.active.medium, data.n_vulns.active.info],
                                            backgroundColor: [
                                                '#dc3545',
                                                '#fd7e14',
                                                '#ffc107',
                                                '#0d6efd',
                                            ],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: { position: 'top' as const },
                                        title: { display: false },
                                    },
                                }}
                            />
                        </div>
                        <div className="mb-3 col-md-3">
                            <h4 className="text-center">Vulnerabilità Passive</h4>
                            <Pie
                                data={{
                                    labels: ['Critiche', 'Alte', 'Medie', 'Info'],
                                    datasets: [
                                        {
                                            data: [data.n_vulns.passive.critical, data.n_vulns.passive.high, data.n_vulns.passive.medium, data.n_vulns.passive.info],
                                            backgroundColor: [
                                                '#dc3545',
                                                '#fd7e14',
                                                '#ffc107',
                                                '#0d6efd',
                                            ],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: { position: 'top' as const },
                                        title: { display: false },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className='card-body row justify-content-evenly text-center'>
                        <div className="col-md-4">
                            <div className='card-body align-content-center'>
                                <h5>Punteggio vulnerabilità attive:</h5>
                                <h2 className='text-center w-100' ><strong>{data.vulnerability_score_active}/100</strong>
                                    {(data.vulnerability_score_active ?? 0) > 50 ? (
                                        <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                                    ) : (
                                        <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                                    )}
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='card-body align-content-center'>
                                <h5>Punteggio vulnerabilità attive:</h5>
                                <h2 className='text-center w-100' ><strong>{data.vulnerability_score_passive}/100</strong>
                                    {(data.vulnerability_score_passive ?? 0) > 50 ? (
                                        <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                                    ) : (
                                        <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                                    )}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card col-md-11 my-3">
                    <div className="card-body">
                        <h4 className="text-center">Esposizione Porte</h4>
                        <Bar data={portBarData} options={portBarOptions} />
                    </div>
                    <div className="card-body row justify-content-evenly text-center">
                        <div className='align-content-center'>
                            <h5>Punteggio rischio porte:</h5>
                            <h2 className='text-center w-100' ><strong>{data.open_ports_score}/100</strong>
                                {(data.open_ports_score ?? 0) > 50 ? (
                                    <i className="fas fa-exclamation-triangle text-danger ms-2" title="Rischio alto"></i>
                                ) : (
                                    <i className="fas fa-check-circle text-success ms-2" title="Rischio basso"></i>
                                )}
                            </h2>
                        </div>
                    </div>
                </div>
            </>
            ) : (
                <h2><i className="fas fa-exclamation-triangle text-danger ms-2"></i> Errore nella generazione del Report</h2>
            )}
        </div>
    );
}


export default Report



