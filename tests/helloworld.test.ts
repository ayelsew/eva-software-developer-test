import HelloWorld from "@/main"

test("Verify if phase was completed", () => {
    expect(HelloWorld("world")).toBe("Hello world");
})