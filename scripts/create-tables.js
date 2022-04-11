"use strict";
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
exports.__esModule = true;
exports.createTables = void 0;
var knex_1 = require("knex");
function createTables() {
    return __awaiter(this, void 0, void 0, function () {
        function createRecipeTable(builder) {
            builder.string('recipeid').unique().primary();
            builder.string('name').unique();
            builder.text('description');
            builder.string('img').nullable();
            builder.string('weather').nullable();
        }
        function createIngredientTable(builder) {
            builder.string('ingredientid').unique().primary();
            builder.string('name');
            builder.string('uom');
            builder.string('quantity');
            builder.string('recipeid').references('recipe.recipeid');
        }
        function createStepTable(builder) {
            builder.string('stepid').unique().primary();
            builder.string('sortkey');
            builder.text('value');
            builder.string('recipeid').references('recipe.recipeid');
        }
        var hasRecipeTable, hasIngredientTable, hasStepTable, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, (0, knex_1["default"])('recipes').schema.hasTable('recipe')];
                case 1:
                    hasRecipeTable = _a.sent();
                    return [4 /*yield*/, (0, knex_1["default"])('recipes').schema.hasTable('ingredient')];
                case 2:
                    hasIngredientTable = _a.sent();
                    return [4 /*yield*/, (0, knex_1["default"])('recipes').schema.hasTable('step')];
                case 3:
                    hasStepTable = _a.sent();
                    if (!!hasRecipeTable) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, knex_1["default"])('recipes').schema.createTable('recipe', createRecipeTable)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!!hasIngredientTable) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, knex_1["default"])('recipes').schema.createTable('ingredient', createIngredientTable)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    if (!!hasStepTable) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, knex_1["default"])('recipes').schema.createTable('step', createStepTable)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, null];
                case 10:
                    e_1 = _a.sent();
                    return [2 /*return*/, e_1];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.createTables = createTables;
