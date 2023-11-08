// noinspection SpellCheckingInspection
interface ingMonth {
    ingredient: string;
    month: string;
    quantite: number;
    unite: string;
}

interface AlimentInfos {
    id: number;
    aliment: string;
    energie: number;
    proteines: number;
    glucides: number;
    lipides: number;
    acidesgrasSatures: number;
    sodium: number;
    fibres: number;
    vitamineA: number;
    vitamineC: number;
    vitamineD: number;
    vitamineE: number;
    vitamineK: number;
    vitamineB1: number;
    vitamineB2: number;
    vitamineB3: number;
    vitamineB5: number;
    vitamineB6: number;
    vitamineB9: number;
    vitamineB12: number;
}

fetch("http://127.0.0.1:8000/res/")
        .then(response => response.json())
        .then(async json => {
            await makeChart(json);
        })
        .catch((error) => console.log(error.message))

async function makeChart(donnees: { [key: string]: ingMonth[] }) {
    let monthEnergy = [], monthProteines = [], monthGlucides = [], monthLipides = [];

    // For each month ingredients
    for await (const [month, arrayIngredients] of Object.entries(donnees)) {
        monthEnergy[month] = 0;
        monthProteines[month] = 0;
        monthGlucides[month] = 0;
        monthLipides[month] = 0;

        // For each ingredient
        for await (const ing of Array.from(arrayIngredients)) {

            //if this is not stored in the session retrieve the data from the API
            if (!sessionStorage.getItem(ing.ingredient)) {
                console.log(await getIngredientInfos(ing.ingredient));
            }

            let aliment: AlimentInfos = JSON.parse(sessionStorage.getItem(ing.ingredient));

            monthEnergy[month] += aliment.energie * ing.quantite;
            monthProteines[month] += aliment.proteines * ing.quantite;
            monthGlucides[month] += aliment.glucides * ing.quantite;
            monthLipides[month] += aliment.lipides * ing.quantite;
        }
    }

    let sectionInfos = document.getElementById('infos-nutritionnelles');
    let canvas = document.createElement('canvas');
    canvas.classList.add('infos-canvas');
    sectionInfos.append(canvas);

    const DATA_COUNT = donnees.length;
    const NUMBER_CFG = {count: donnees.length, min: 0, max: 10000};

    const data = {
        labels: Object.keys(monthEnergy),
        datasets: [{
            label: 'Calories',
            data: Object.values(monthEnergy),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
            ],
            borderWidth: 1
        },
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Calories totale'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    // @ts-ignore
    const chart = new Chart(canvas, config);

    let canvas2 = document.createElement('canvas');
    canvas2.classList.add('infos-canvas');
    sectionInfos.append(canvas2);

    const DATA_COUNT2 = donnees.length;
    const NUMBER_CFG2 = {count: donnees.length, min: 0, max: 10000};

    const data2 = {
        labels: Object.keys(monthProteines),
        datasets: [{
            label: 'Protéines',
            data: Object.values(monthProteines),
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgb(54, 162, 235)',
            ],
            borderWidth: 1
        }, {
            label: 'Glucides',
            data: Object.values(monthGlucides),
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgb(255, 159, 64)',
            ],
            borderWidth: 1
        }, {
            label: 'Lipides',
            data: Object.values(monthLipides),
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgb(75, 192, 192)',
            ],
            borderWidth: 1
        },
        ]
    };

    const config2 = {
        type: 'line',
        data: data2,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Macronutriments'
                }
            }
        },
    };

    const chart2 = new Chart(canvas2, config2);
}

async function getIngredientInfos(ingredient: string) {
    return await fetch("https://lab013.2isa.org/aliment/" + ingredient)
        .then(response => response.json())
        .then((json: AlimentInfos) => {
            sessionStorage.setItem(json.aliment, JSON.stringify(json));
            return json;
        });
}

