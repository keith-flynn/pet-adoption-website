const searchJS = require("../js/search");

describe_ast("Search page functions", () => {
  test("capitalize the first letter of each word in a string", () => {
    const input = "the quick brown fox jumped over the lazy dog";

    const output = "The Quick Brown Fox Jumped Over The Lazy Dog";

    expect(capitalizeWords(input)).toEqual(output);
  })
});