//data source https://www.northeastern.edu/graduate/blog/most-popular-programming-languages/
// https://en.wikipedia.org/
const seedData = [
  {
    name: "Python",
    description:
      "Python is a widely-used, interpreted, object-oriented, and high-level programming language with dynamic semantics, used for general-purpose programming",
    releaseDate: "02/20/1991",
    founder: "Guido van Rossum",
    ides: [
      {
        name: "VS Code",
        developer: "Microsoft Corporation",
      },
      {
        name: "pycharm",
        developer: "JetBrains",
      },
    ],
  },
  {
    name: "JavaScript",
    description:
      "JavaScript is the most popular programming language for building interactive websites; “virtually everyone is using it,” Gorton says. When combined with Node.js, programmers can use JavaScript to produce web content on the server before a page is sent to the browser, which can be used to build games and communication applications that run directly in the browser. A wide variety of add-ons extend the functionality of JavaScript as well. ",
    releaseDate: "12/04/1995",
    founder: "Brendan Eich",
    ides: [
      {
        name: "VS Code",
        developer: "Microsoft Corporation",
      },
      {
        name: "IntelliJ IDEA",
        developer: "JetBrains",
      },
    ],
  },
  {
    name: "Java",
    description:
      "Java is a set of computer software and specifications developed by James Gosling at Sun Microsystems, which was later acquired by the Oracle Corporation, that provides a system for developing application software and deploying it in a cross-platform computing environment",
    releaseDate: "01/23/1996",
    founder: "Oracle Corporation, Sun Microsystems, James Gosling",
    ides: [
      {
        name: "VS Code",
        developer: "Microsoft Corporation",
      },
      {
        name: "Eclipse",
        developer: "Eclipse Foundation",
      },
      {
        name: "NetBeans",
        developer: "Oracle Corporation",
      },
    ],
  },
  {
    name: "C#",
    description:
      "C# is a general-purpose, multi-paradigm programming language encompassing static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines.",
    releaseDate: "11/10/2020",
    founder: "Microsoft",
    ides: [
      {
        name: "Microsoft Visual Studio",
        developer: "Microsoft Corporation",
      },
      {
        name: "Rider",
        developer: "JetBrains",
      },
    ],
  },
  {
    name: "C",
    description:
      "C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. By design, C provides constructs that map efficiently to typical machine instructions",
    releaseDate: "01/01/1978",
    founder: "Dennis Ritchie",
    ides: [
      {
        name: "Eclipse",
        developer: "Eclipse Foundation",
      },
      {
        name: "Microsoft Visual Studio",
        developer: "Microsoft Corporation",
      },
    ],
  },
  {
    name: "C++",
    description:
      'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes"',
    releaseDate: "01/01/1985",
    founder: "Bjarne Stroustrup",
    ides: [
      {
        name: "Microsoft Visual Studio",
        developer: "Microsoft Corporation",
      },
    ],
  },
];
module.exports = seedData;
