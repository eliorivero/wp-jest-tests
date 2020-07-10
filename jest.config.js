module.exports = {
    verbose: true,
    setupFiles: [
        '<rootDir>/__mocks__/globals.js'
    ],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js'
    }
};
