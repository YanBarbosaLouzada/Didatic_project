// jest.config.js
module.exports = {
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!axios)"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Add this line
    collectCoverage: true,
    collectCoverageFrom: ["src/components/**/*.{js,jsx}", "!src/index.js"],
    coverageReporters: ["text", "lcov"],
    // transform: {
    //   "^.+\\.(js|jsx)$": "babel-jest",
    // },
};