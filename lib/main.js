"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const compare_versions_1 = require("compare-versions");
function isValidOperator(operator) {
    return ['>', '<', '=', '<=', '>='].includes(operator);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const firstToCompare = core.getInput('first');
            const secondToCompare = core.getInput('second');
            var operator = core.getInput('operator');
            if (!firstToCompare) {
                throw new Error("'first' input is missing");
            }
            if (!secondToCompare) {
                throw new Error("'second' input is missing");
            }
            if (operator) {
                if (!isValidOperator(operator)) {
                    throw new Error(`Unvalid operator ${operator}. Only the following ar allowed: '>', '<', '=', '<=', '>='`);
                }
            }
            else {
                operator = '>';
            }
            // Cast to CompareOperator can be made since the `operator` content has been already checked.
            const result = (0, compare_versions_1.compare)(firstToCompare, secondToCompare, operator);
            core.setOutput("result", result);
            console.log(`'${firstToCompare} ${operator} ${secondToCompare}' comparison result is ${result}`);
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();