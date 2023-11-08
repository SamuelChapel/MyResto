interface PlatInfos {
    plat: string;
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

interface Ingredient {
    id: number;
    nom: string;
    quantite: number;
    unite: string;
}

Array.from(document.getElementsByClassName("plat")).forEach((td: HTMLTableCellElement) => {
    let plat: string = td.textContent;

    td.addEventListener("click", async () => {

            const platInfos: { ingredients: Ingredient[], infos: AlimentInfos[] } = JSON.parse(sessionStorage.getItem(plat)) ?? await getPLatInfos(plat);

            const ing = platInfos.infos.reduce((a, b) => {
                for (const [k, v] of Object.entries(b)) {
                    a[k] += v;
                }
                return a;
            });

            if (document.getElementsByClassName("modal").length == 0) {
                document.body.appendChild(makeModal(td.textContent, platInfos.ingredients, platInfos.infos));
            }
        }
    )
})

async function getPLatInfos(plat: string) {

    const platIngredients: Ingredient[] = await fetch("http://127.0.0.1:8000/plat/" + plat, {mode: 'cors'})
        .then((response: Response) => response.json());

    const ingredientsInfos: AlimentInfos[] = await Promise.all(platIngredients.map(i => fetch("https://lab013.2isa.org/aliment/" + i.nom)))
        .then(async (responses: Response[]) => await Promise.all(responses.map(r => r.json())))

    sessionStorage.setItem(plat, JSON.stringify({ingredients: platIngredients, infos: ingredientsInfos}));

    return {ingredients: platIngredients, infos: ingredientsInfos};
}

let modal

function makeModal(plat: string, ingredients: Ingredient[], aliments: AlimentInfos[]) {
    modal = document.createElement("div");
    modal.classList.add("modal");

    let div = document.createElement('div');
    div.classList.add("modal-content");
    let p = document.createElement('p');
    p.classList.add("modal-title");
    p.textContent = plat;
    div.append(p);

    ingredients.forEach(ingredient => {
        let p = document.createElement('p');
        p.textContent = ingredient.nom + " : " + ingredient.quantite + " " + ingredient.unite;
        div.append(p);
    })

    let canvas = document.createElement('canvas');
    div.append(canvas);

    let close = document.createElement("span");
    close.classList.add("close");

    div.append(canvas, close);
    let p2 = document.createElement('p');
    p2.textContent = "Energie : " + aliments.map(aliment => aliment.energie).reduce((a, b, i) => a + b * ingredients[i].quantite, 0) + " kJ";
    div.append(p2);
    modal.append(div);

    const data = {
        labels: ['Protéines', 'Glucides', 'Lipides'],
        datasets: [{
            label: '# of Votes',
            data: [
                aliments.map(aliment => aliment.proteines).reduce((a, b, i) => a + b * ingredients[i].quantite, 0),
                aliments.map(aliment => aliment.glucides).reduce((a, b, i) => a + b * ingredients[i].quantite, 0),
                aliments.map(aliment => aliment.lipides).reduce((a, b, i) => a + b * ingredients[i].quantite, 0)
            ],
            borderWidth: 1,
            backgroundColor: [
                '#CB4335',
                '#1F618D',
                '#F1C40F'],
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    onHover: handleHover,
                    onLeave: handleLeave
                }
            }
        }
    };

    const chart = new Chart(canvas, config);

    /*for (const [key, al] of Object.entries(aliment)) {
        let p = document.createElement('p');
        p.classList.add("modal-content");
        p.textContent = key + " : " + al;
        modal.append(p);
    }*/

    return modal;
}

window.addEventListener("click", (ev) => {
    if (ev.target == modal) {
        modal.remove();
    }
})

// Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
        colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
}

// Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
        colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
}
