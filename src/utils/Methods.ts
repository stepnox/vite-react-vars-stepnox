export function formatSummaryText(text: string) {
    // Sostituisce **testo** con <strong>testo</strong>
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>');
}

export function getPortBarData(data: any) {
    const portLabels = Object.keys(data.n_port);
    const portValues = portLabels.map(port => data.n_port[port].n);
    return {
        labels: portLabels,
        datasets: [
            {
                label: 'Rischio (n esposizioni)',
                data: portValues,
                backgroundColor: '#0d6efd',
            },
        ],
    };
}

export const portBarOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: true, text: 'Esposizione Porte' },
    },
};

export function getDataleakData(data: any) {
    const dataleak_categories = ['vip', 'domain_stealer', 'potential_stealer', 'other_stealer', 'general_leak'];
    const dataleak_labels = ['VIP', 'Domain Stealer', 'Potential Stealer', 'Other Stealer', 'General Leak'];
    return {
        labels: dataleak_labels,
        datasets: [
            {
                label: 'Totale',
                data: dataleak_categories.map(cat => data.n_dataleak.total[cat]),
                backgroundColor: 'blue',
            },
            {
                label: 'Risolte',
                data: dataleak_categories.map(cat => data.n_dataleak.resolved[cat]),
                backgroundColor: 'green',
            },
            {
                label: 'Non risolte',
                data: dataleak_categories.map(cat => data.n_dataleak.unresolved[cat]),
                backgroundColor: 'red',
            },
        ],
    };
}

export const dataleakOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: true, text: 'Categorie' },
    },
};

