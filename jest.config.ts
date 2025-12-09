import type { Config } from "jest";

const config: Config = {
  rootDir: "./",
  testEnvironment: "<rootDir>/test/FixJSDOMEnvironment.ts",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/mocks/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/test/mocks/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
