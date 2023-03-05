"use strict";
function init({ typescript: ts, }) {
    function create(info) {
        const proxy = Object.create(null);
        for (let k of Object.keys(info.languageService)) {
            const x = info.languageService[k];
            // @ts-expect-error - JS runtime trickery which is tricky to type tersely
            proxy[k] = (...args) => x.apply(info.languageService, args);
        }
        info.project.projectService.logger.info("Hello from remove use state!");
        proxy.getDefinitionAndBoundSpan = (fileName, position) => {
            var _a;
            const prior = info.languageService.getDefinitionAndBoundSpan(fileName, position);
            if (!prior) {
                return;
            }
            prior.definitions = (_a = prior.definitions) === null || _a === void 0 ? void 0 : _a.filter((def) => def.name !== "useState");
            return prior;
        };
        return proxy;
    }
    return { create };
}
module.exports = init;
//# sourceMappingURL=index.js.map