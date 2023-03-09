import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  testEnvironment: "node",
  preset: "ts-jest",
  moduleNameMapper: {
    /**
     * Here I added the same on tsconfig.json `compilerOptions.path`
     * Follow: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring 
     */
    "@/(.*)": [ "<rootDir>/src/$1" ]
  }
}

export default config
