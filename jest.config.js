// eslint-disable-next-line no-undef
module.exports = {
    bail: 5,
    collectCoverageFrom: ['src/**/[A-Z]*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/', '/__tests__/'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleNameMapper: {
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
};
