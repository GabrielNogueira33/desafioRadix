document.addEventListener("DOMContentLoaded", function () {

    function fetchData(query) {
        return fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
            .then(response => response.json())
            .then(data => data.data);
    }

    const queryMediaDia = `
        query {
            mediaDia {
                value
            }
        }
    `;

    const queryMedia2Dias = `
    query{
        media2Dias{
            value
        }
    }
    `

    const queryMediaSemana = `
        query {
            mediaSemana {
                value
            }
        }
    `;

    const queryMediaMes = `
        query {
            mediaMes {
                value
            }
        }
    `;

    const queryMaior = `
        query {
            maior {
                value
            }
        }
    `;
    const queryMenor = `
        query {
            menor {
                value
            }
        }
    `
    const queryListaDia = `
    query {
        mediaDiaLista{
            value
        }
    }
    `

    // const queryLista2Dias = `
    // query {
    //     media2DiasLista{
    //         value
    //     }
    // }
    // `

    // const queryListaSemana = `
    // query{
    //     mediaSemanaLista{
    //         value
    //     }
    // }
    // `

    // const queryListaMes = `
    // query{
    //     mediaMesLista{
    //         value
    //     }
    // }
    // `
    ;


    Promise.all([
        fetchData(queryMediaDia),
        fetchData(queryMedia2Dias),
        fetchData(queryMediaSemana),
        fetchData(queryMediaMes),
        fetchData(queryMaior),
        fetchData(queryMenor),
        fetchData(queryListaDia)
    ]).then(([mediaDiaListaData, mediaDiaData, media2DiasData, mediaSemanaData, mediaMesData, maiorData, menorData]) => {
        console.log(mediaDiaData);  
        console.log(media2DiasData);
        console.log(mediaSemanaData);
        console.log(mediaMesData);
        console.log(maiorData);
        console.log(menorData);
        
        const mediaDia = mediaDiaData && mediaDiaData.mediaDia ? mediaDiaData.mediaDia[0].value : 0;
        const media2Dias = media2DiasData && media2DiasData.media2Dias ? media2DiasData.media2Dias[0].value : 0;
        const mediaSemana = mediaSemanaData && mediaSemanaData.mediaSemana ? mediaSemanaData.mediaSemana[0].value : 0;
        const mediaMes = mediaMesData && mediaMesData.mediaMes ? mediaMesData.mediaMes[0].value : 0;
        const maiorValor = maiorData && maiorData.maior ? maiorData.maior[0].value : 0;
        const menorValor = menorData && menorData.menor ? menorData.menor[0].value : 0;
        
        // const media2DiasLista = media2DiasListaData
        // const mediaSemanaLista = mediaSemanaListaData
        // const mediaMesLista = mediaMesListaData

        const mediaDiaLista = mediaDiaListaData && mediaDiaListaData.mediaDiaLista 
        ? mediaDiaListaData.mediaDiaLista.map(item => item.value) 
        : [];

        
                            var kpi1 = document.getElementById('p_kpi1');
                            var kpi2 = document.getElementById('p_kpi2');
                            var kpi3 = document.getElementById('p_kpi3');
                            var kpi4 = document.getElementById('p_kpi4');

                            kpi1.innerHTML = `Média: ${mediaDia}`;
                            kpi2.innerHTML = `Maior: ${maiorValor}`;
                            kpi3.innerHTML = `Menor: ${menorValor}`;
                            kpi4.innerHTML = `Média: ${mediaMes} `;

                            function criarGrafico(ctx,label, data, labels, cor) {
                                return new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: labels,
                                        datasets: [{
                                            label: label,
                                            data: data,
                                            borderWidth: 2,
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
                            criarGrafico(ctx1, 'Média 1 Dia', mediaDia, labelsDia, 'green');

                            const ctx2 = document.getElementById('myChart2').getContext('2d');
                            criarGrafico(ctx2, 'Média 2 Dias', media2Dias, labelsDia, 'purple');

                            const ctx3 = document.getElementById('myChart3').getContext('2d');
                            criarGrafico(ctx3, 'Média 1 Semana', mediaSemana, labelsSemana, 'orangered');

                            const ctx4 = document.getElementById('myChart4').getContext('2d');
                            criarGrafico(ctx4, 'Média 1 Mês', mediaMes, labelsMes, 'grey');
                        });
                    });

        