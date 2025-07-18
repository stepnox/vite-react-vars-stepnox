import React from 'react';

interface EmailSecurityModalProps {
    show: boolean;
    onClose: () => void;
    emailSecurity: {
        spoofable: string;
        dmarc_policy: string;
        blacklist_detections: number | null;
        blacklist_total_list: number | null;
        blacklist_detected_list: string[] | never[];
    };
}

const EmailSecurityModal: React.FC<EmailSecurityModalProps> = ({ show, onClose, emailSecurity }) => {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dettagli Sicurezza Email</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Spoofing:</strong> {emailSecurity.spoofable === 'Spoofing possible' ? 'Possibile' : 'Protetto'}
                            </li>
                            <li className="list-group-item">
                                <strong>DMARC Policy:</strong> {emailSecurity.dmarc_policy}
                            </li>
                            <li className="list-group-item">
                                <strong>Rilevamenti da Blacklist:</strong> {emailSecurity.blacklist_detections}
                            </li>
                            <li className="list-group-item">
                                <strong>Blacklist Totali:</strong> {emailSecurity.blacklist_total_list}
                            </li>
                            <li className="list-group-item">
                                <strong>Blacklist rilevate:</strong>{" "}
                                {emailSecurity.blacklist_detected_list && emailSecurity.blacklist_detected_list.length > 0
                                    ? emailSecurity.blacklist_detected_list.join(", ")
                                    : "Nessuna"}
                            </li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailSecurityModal;