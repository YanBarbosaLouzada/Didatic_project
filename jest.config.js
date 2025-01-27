module.exports = {
    testEnvironment: "node", // Ambiente de testes (ex.: node, jsdom para front-end)
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: ["/node_modules/(?!axios)"],
    transform: { "^.+\\.jsx?$": "babel-jest", },// Indica ao Jest que use o Babel para arquivos JS/JSX
    testEnvironment: "jsdom",
    moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1", },// Mapeia "@/" para o diretório "src/"
    collectCoverage: true, // Ativa a coleta de cobertura
    collectCoverageFrom: ["src/**/*.js"], // Onde coletar cobertura
};
