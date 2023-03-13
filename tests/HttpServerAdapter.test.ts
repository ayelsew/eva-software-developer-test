jest.mock("express");

import express, { Express } from "express"
import HttpServerAdapter from "@/interfaces/adapters/httpServerAdapter"

describe("Test adapter HttpServer", () => {

  afterEach(() => {
    jest.mocked(express).mockClear()
  })

  test("Start server", () => {
    const listen = jest.fn((_m, cb) => cb())
    const callback = jest.fn()

    jest.mocked(express).mockReturnValue({ listen } as unknown as Express)

    new HttpServerAdapter(2222, callback)

    expect(listen).toHaveBeenCalledTimes(1)
    expect(listen).toHaveBeenLastCalledWith(2222, callback)
    expect(callback).toHaveBeenCalledTimes(1)
  });

  test("Basic register endpoint", () => {
    const register = jest.fn()
    const handler = () => undefined
    let server: HttpServerAdapter;

    jest.mocked(express).mockReturnValue({ get: register, listen: jest.fn() } as unknown as Express)

    server = new HttpServerAdapter(2222)
    server.register("get", "/test", handler)

    expect(register).toHaveBeenCalledTimes(1)
    expect(register).toHaveBeenCalledWith("/test", handler)
  });

  test("Middleware register endpoint", () => {
    const register = jest.fn()
    const handler = jest.fn()
    let server: HttpServerAdapter;

    jest.mocked(express).mockReturnValue({ get: register, listen: jest.fn() } as unknown as Express)

    server = new HttpServerAdapter(2222)
    server.register("get", "/test", [], handler)

    expect(register).toHaveBeenCalledTimes(1)
    expect(register).toHaveBeenCalledWith("/test", [], handler)
  });
})