import { describe, it, expect } from "vitest";
import CapitalizeEachWord from "./capitalizeEachWord";

describe("CapitalizeEachWord", () => {
  it("capitalizes each word in a sentence", () => {
    expect(CapitalizeEachWord("hello world")).toBe("Hello World");
    expect(CapitalizeEachWord("mohamed elsayed")).toBe("Mohamed Elsayed");
  });

  it("handles extra spaces", () => {
    expect(CapitalizeEachWord("  ali   omar ")).toBe("Ali Omar");
  });

  it("returns empty string when input is empty", () => {
    expect(CapitalizeEachWord("")).toBe("");
  });

  it("does not change already capitalized words", () => {
    expect(CapitalizeEachWord("Frontend Developer")).toBe("Frontend Developer");
  });
});
