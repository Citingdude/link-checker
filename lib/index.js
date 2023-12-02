var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parse } from 'node-html-parser';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseURL = 'https://vibefusion.be';
        const response = yield fetch('https://vibefusion.be');
        const invalidLinks = [];
        const html = yield response.text();
        const parsedHTML = parse(html);
        const links = parsedHTML.getElementsByTagName('a');
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            const linkHref = link === null || link === void 0 ? void 0 : link.getAttribute('href');
            if (!linkHref)
                return;
            const url = baseURL + linkHref;
            try {
                const linkIsValid = yield checkLink(url);
                if (!linkIsValid)
                    invalidLinks.push(url);
            }
            catch (error) {
                invalidLinks.push(url);
            }
        }
        console.log(invalidLinks);
    });
}
function checkLink(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Checking url: ' + url);
        const response = yield fetch(url);
        return response.status === 200;
    });
}
main();
//# sourceMappingURL=index.js.map