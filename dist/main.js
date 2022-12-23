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
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://assignment-api.piton.com.tr/docs/`;
        const response = yield fetch(url);
        console.log(response);
        const responseData = yield response.json();
        console.log('responseData: ');
        console.log(responseData);
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            console.log(error);
            throw error;
        }
        // return responseData
    });
}
getTasks();
//# sourceMappingURL=main.js.map