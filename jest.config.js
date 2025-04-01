// // jest.config.js
// module.exports = {
//     transform: {
//         "^.+\\.[jt]sx?$": "babel-jest",
//     },
//     transformIgnorePatterns: ["/node_modules/(?!axios)"],
//     moduleNameMapper: {
//         "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     },
//     testEnvironment: "jsdom",
//     setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Add this line
//     collectCoverage: true,
//     collectCoverageFrom: ["src/components/**/*.{js,jsx}", "!src/index.js"],
//     coverageReporters: ["text", "lcov"],
//     // transform: {
//     //   "^.+\\.(js|jsx)$": "babel-jest",
//     // },
// };

module.exports = {
    //dis ao jest como processar os arquivos js mordernos com babel
    transform: { "^.\\.[jt]sx?$": "babel-jest" },
    // ignora o erro do axios
    transformIgnorePatterns: ["/node_modules/(?!axios)"],
    //define aliases para caminhos customizados nos imports
    moduleNameMapper: { "\\.(css|less|scss|sass)$ ": "identity-obj-proxy" },
    testEnvironment: "jsdom",
    setupFilesAfterEnv:["<rootDir>/src/setupTest.js"]
}
