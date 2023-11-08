var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Array.from(document.getElementsByClassName("plat")).forEach(function (td) {
    var plat = td.textContent;
    td.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var platInfos, _a, ing;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_b = JSON.parse(sessionStorage.getItem(plat))) !== null && _b !== void 0)) return [3 /*break*/, 1];
                    _a = _b;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, getPLatInfos(plat)];
                case 2:
                    _a = _c.sent();
                    _c.label = 3;
                case 3:
                    platInfos = _a;
                    ing = platInfos.infos.reduce(function (a, b) {
                        for (var _i = 0, _a = Object.entries(b); _i < _a.length; _i++) {
                            var _b = _a[_i], k = _b[0], v = _b[1];
                            a[k] += v;
                        }
                        return a;
                    });
                    if (document.getElementsByClassName("modal").length == 0) {
                        document.body.appendChild(makeModal(td.textContent, platInfos.ingredients, platInfos.infos));
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
function getPLatInfos(plat) {
    return __awaiter(this, void 0, void 0, function () {
        var platIngredients, ingredientsInfos;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://127.0.0.1:8000/plat/" + plat, { mode: 'cors' })
                        .then(function (response) { return response.json(); })];
                case 1:
                    platIngredients = _a.sent();
                    return [4 /*yield*/, Promise.all(platIngredients.map(function (i) { return fetch("https://lab013.2isa.org/aliment/" + i.nom); }))
                            .then(function (responses) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(responses.map(function (r) { return r.json(); }))];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 2:
                    ingredientsInfos = _a.sent();
                    sessionStorage.setItem(plat, JSON.stringify({ ingredients: platIngredients, infos: ingredientsInfos }));
                    return [2 /*return*/, { ingredients: platIngredients, infos: ingredientsInfos }];
            }
        });
    });
}
var modal;
function makeModal(plat, ingredients, aliments) {
    modal = document.createElement("div");
    modal.classList.add("modal");
    var div = document.createElement('div');
    div.classList.add("modal-content");
    var p = document.createElement('p');
    p.classList.add("modal-title");
    p.textContent = plat;
    div.append(p);
    ingredients.forEach(function (ingredient) {
        var p = document.createElement('p');
        p.textContent = ingredient.nom + " : " + ingredient.quantite + " " + ingredient.unite;
        div.append(p);
    });
    var canvas = document.createElement('canvas');
    div.append(canvas);
    var close = document.createElement("span");
    close.classList.add("close");
    div.append(canvas, close);
    var p2 = document.createElement('p');
    p2.textContent = "Energie : " + aliments.map(function (aliment) { return aliment.energie; }).reduce(function (a, b, i) { return a + b * ingredients[i].quantite; }, 0) + " kJ";
    div.append(p2);
    modal.append(div);
    var data = {
        labels: ['Protéines', 'Glucides', 'Lipides'],
        datasets: [{
                label: '# of Votes',
                data: [
                    aliments.map(function (aliment) { return aliment.proteines; }).reduce(function (a, b, i) { return a + b * ingredients[i].quantite; }, 0),
                    aliments.map(function (aliment) { return aliment.glucides; }).reduce(function (a, b, i) { return a + b * ingredients[i].quantite; }, 0),
                    aliments.map(function (aliment) { return aliment.lipides; }).reduce(function (a, b, i) { return a + b * ingredients[i].quantite; }, 0)
                ],
                borderWidth: 1,
                backgroundColor: [
                    '#CB4335',
                    '#1F618D',
                    '#F1C40F'
                ],
            }]
    };
    var config = {
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
    var chart = new Chart(canvas, config);
    /*for (const [key, al] of Object.entries(aliment)) {
        let p = document.createElement('p');
        p.classList.add("modal-content");
        p.textContent = key + " : " + al;
        modal.append(p);
    }*/
    return modal;
}
window.addEventListener("click", function (ev) {
    if (ev.target == modal) {
        modal.remove();
    }
});
// Append '4d' to the colors (alpha channel), except for the hovered index
function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach(function (color, index, colors) {
        colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
}
// Removes the alpha channel from background colors
function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach(function (color, index, colors) {
        colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
}
