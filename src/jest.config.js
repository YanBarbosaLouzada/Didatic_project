
export default {
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Transforma JS/JSX usando Babel
    },
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: [".jsx", ".js"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    transformIgnorePatterns: [
        "node_modules/(?!axios)/", // Adicione essa linha
    ],
};
