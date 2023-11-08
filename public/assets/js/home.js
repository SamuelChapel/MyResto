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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _this = this;
fetch("http://127.0.0.1:8000/res/")
    .then(function (response) { return response.json(); })
    .then(function (json) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, makeChart(json)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) { return console.log(error.message); });
function makeChart(donnees) {
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, void 0, function () {
        var monthEnergy, monthProteines, monthGlucides, monthLipides, _c, _d, _e, month, arrayIngredients, _f, _g, ing, _h, _j, aliment, e_2_1, e_1_1, sectionInfos, canvas, DATA_COUNT, NUMBER_CFG, data, config, chart, canvas2, DATA_COUNT2, NUMBER_CFG2, data2, config2, chart2;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    monthEnergy = [], monthProteines = [], monthGlucides = [], monthLipides = [];
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 19, 20, 25]);
                    _c = __asyncValues(Object.entries(donnees));
                    _k.label = 2;
                case 2: return [4 /*yield*/, _c.next()];
                case 3:
                    if (!(_d = _k.sent(), !_d.done)) return [3 /*break*/, 18];
                    _e = _d.value, month = _e[0], arrayIngredients = _e[1];
                    monthEnergy[month] = 0;
                    monthProteines[month] = 0;
                    monthGlucides[month] = 0;
                    monthLipides[month] = 0;
                    _k.label = 4;
                case 4:
                    _k.trys.push([4, 11, 12, 17]);
                    _f = (e_2 = void 0, __asyncValues(Array.from(arrayIngredients)));
                    _k.label = 5;
                case 5: return [4 /*yield*/, _f.next()];
                case 6:
                    if (!(_g = _k.sent(), !_g.done)) return [3 /*break*/, 10];
                    ing = _g.value;
                    if (!!sessionStorage.getItem(ing.ingredient)) return [3 /*break*/, 8];
                    _j = (_h = console).log;
                    return [4 /*yield*/, getIngredientInfos(ing.ingredient)];
                case 7:
                    _j.apply(_h, [_k.sent()]);
                    _k.label = 8;
                case 8:
                    aliment = JSON.parse(sessionStorage.getItem(ing.ingredient));
                    monthEnergy[month] += aliment.energie * ing.quantite;
                    monthProteines[month] += aliment.proteines * ing.quantite;
                    monthGlucides[month] += aliment.glucides * ing.quantite;
                    monthLipides[month] += aliment.lipides * ing.quantite;
                    _k.label = 9;
                case 9: return [3 /*break*/, 5];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _k.trys.push([12, , 15, 16]);
                    if (!(_g && !_g.done && (_b = _f.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _b.call(_f)];
                case 13:
                    _k.sent();
                    _k.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [3 /*break*/, 2];
                case 18: return [3 /*break*/, 25];
                case 19:
                    e_1_1 = _k.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 25];
                case 20:
                    _k.trys.push([20, , 23, 24]);
                    if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 22];
                    return [4 /*yield*/, _a.call(_c)];
                case 21:
                    _k.sent();
                    _k.label = 22;
                case 22: return [3 /*break*/, 24];
                case 23:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 24: return [7 /*endfinally*/];
                case 25:
                    sectionInfos = document.getElementById('infos-nutritionnelles');
                    canvas = document.createElement('canvas');
                    canvas.classList.add('infos-canvas');
                    sectionInfos.append(canvas);
                    DATA_COUNT = donnees.length;
                    NUMBER_CFG = { count: donnees.length, min: 0, max: 10000 };
                    data = {
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
                    config = {
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
                    chart = new Chart(canvas, config);
                    canvas2 = document.createElement('canvas');
                    canvas2.classList.add('infos-canvas');
                    sectionInfos.append(canvas2);
                    DATA_COUNT2 = donnees.length;
                    NUMBER_CFG2 = { count: donnees.length, min: 0, max: 10000 };
                    data2 = {
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
                    config2 = {
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
                    chart2 = new Chart(canvas2, config2);
                    return [2 /*return*/];
            }
        });
    });
}
function getIngredientInfos(ingredient) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://lab013.2isa.org/aliment/" + ingredient)
                        .then(function (response) { return response.json(); })
                        .then(function (json) {
                        sessionStorage.setItem(json.aliment, JSON.stringify(json));
                        return json;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
