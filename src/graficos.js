document.addEventListener("DOMContentLoaded", function () {
    function fetchData(query) {
        return fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.data);
    }

    const queries = {
        mediaDia: `
            query {
                mediaDia {
                    value
                }
            }
        `,
        media2Dias: `
            query {
                media2Dias {
                    value
                }
            }
        `,
        mediaSemana: `
            query {
                mediaSemana {
                    value
                }
            }
        `,
        mediaMes: `
            query {
                mediaMes {
                    value
                }
            }
        `,
        maior: `
            query {
                maior {
                    value
                }
            }
        `,
        menor: `
            query {
                menor {
                    value
                }
            }
        `,
        mediaDiaLista: `
            query {
                mediaDiaLista {
                    value
                }
            }
        `,
        media2DiasLista:`
            query {
                media2DiasLista {
                    value
                }
            }
        `,
        mediaSemanaLista:`
            query {
                mediaSemanaLista {
                    value
                }
            }
        `,
        mediaMesLista:`
            query {
                mediaMesLista {
                    value
                }
            }
        `,
    };

    Promise.all([
        fetchData(queries.mediaDia),
        fetchData(queries.media2Dias),
        fetchData(queries.mediaSemana),
        fetchData(queries.mediaMes),
        fetchData(queries.maior),
        fetchData(queries.menor),
        fetchData(queries.mediaDiaLista),
        fetchData(queries.media2DiasLista),
        fetchData(queries.mediaSemanaLista),
        fetchData(queries.mediaMesLista)
    ]).then(([mediaDiaData, media2DiasData, mediaSemanaData, mediaMesData, maiorData, menorData, mediaDiaListaData, media2DiasListaData, mediaSemanaListaData, mediaMesListaData]) => {
        const mediaDia = mediaDiaData?.mediaDia[0]?.value || 0;
        const media2Dias = media2DiasData?.media2Dias[0]?.value || 0;
        const mediaSemana = mediaSemanaData?.mediaSemana[0]?.value || 0;
        const mediaMes = mediaMesData?.mediaMes[0]?.value || 0;
        const maiorValor = maiorData?.maior[0]?.value || 0;
        const menorValor = menorData?.menor[0]?.value || 0;

        
        const mediaDiaLista = mediaDiaListaData?.mediaDiaLista.map(item => item.value) || [];
        const media2DiasLista = media2DiasListaData?.media2DiasLista.map(item => item.value) || [];
        const mediaSemanaLista = mediaSemanaListaData?.mediaSemanaLista.map(item => item.value) || [];
        const mediaMesLista = mediaMesListaData?.mediaMesLista.map(item => item.value) || [];

        
        document.getElementById('p_kpi1').innerHTML = `Média 1 Dia: ${mediaDia.toFixed(2)}`;
        document.getElementById('p_kpi2').innerHTML = `Maior: ${maiorValor}`;
        document.getElementById('p_kpi3').innerHTML = `Menor: ${menorValor}`;
        document.getElementById('p_kpi4').innerHTML = `Média 1 Mês: ${mediaMes.toFixed(2)}`;

        
        function criarGrafico(ctx, label, data, labels, cor) {
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        borderWidth: 5,
                        borderColor: cor,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        const labelsDia = ['8h', '12h', '16h', '20h', '22h'];
        const labelsSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        const labelsMes = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

        const ctx1 = document.getElementById('myChart1').getContext('2d');
        criarGrafico(ctx1, 'Média 1 Dia', mediaDiaLista, labelsDia, 'green');

        const ctx2 = document.getElementById('myChart2').getContext('2d');
        criarGrafico(ctx2, 'Média 2 Dias', media2DiasLista, labelsDia, 'purple');

        const ctx3 = document.getElementById('myChart3').getContext('2d');
        criarGrafico(ctx3, 'Média 1 Semana', mediaSemanaLista, labelsSemana, 'orangered');

        const ctx4 = document.getElementById('myChart4').getContext('2d');
        criarGrafico(ctx4, 'Média 1 Mês', mediaMesLista, labelsMes, 'grey');
    }).catch(error => {
        console.error('Erro ao carregar dados:', error);
    });
});
