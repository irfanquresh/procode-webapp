const testLibrary = [
  {
    title: "Java Script Assessment",
    slug: "java-script-assessment",
    questions: [
      {
        title: "Javascript is an _______ language?",
        complexity: "Low",
        options: [
          { option: "Object Oriented", isCorrect: false },
          { option: "Object Base", isCorrect: false },
          { option: "Procedural", isCorrect: true },
          { option: "None of the above", isCorrect: false },
        ],
      },
      {
        title:
          "Which of the following keywords is used to define a variable in Javascript?",
        complexity: "Low",
        options: [
          { option: "var", isCorrect: false },
          { option: "let", isCorrect: false },
          { option: "Both A and B", isCorrect: true },
          { option: "None of the above", isCorrect: false },
        ],
      },
      {
        title:
          "Which of the following methods is used to access HTML elements using Javascript?",
        complexity: "Low",
        options: [
          { option: "getElementById()", isCorrect: false },
          { option: "getElementByClassName", isCorrect: false },
          { option: "Both A and B", isCorrect: true },
          { option: "None of the above", isCorrect: false },
        ],
      },
      {
        title:
          "Upon encountering empty statements, what does the Javascript Interpreter do?",
        complexity: "Medium",
        options: [
          { option: "Throws an Error", isCorrect: false },
          { option: "Ignores teh statement", isCorrect: true },
          { option: "Gives a Warning", isCorrect: false },
          { option: "None of the above", isCorrect: false },
        ],
      },
      {
        title:
          "Which of the following methods can be used to display data in some form using Javascript?",
        complexity: "Medium",
        options: [
          { option: "document.write()", isCorrect: false },
          { option: "console.log()", isCorrect: false },
          { option: "window.alert()", isCorrect: false },
          { option: "All of the above", isCorrect: true },
        ],
      },
      {
        title: "How can a datatype be declared to be a constant type?",
        complexity: "Medium",
        options: [
          { option: "const", isCorrect: true },
          { option: "let", isCorrect: false },
          { option: "var", isCorrect: false },
          { option: "All of the above", isCorrect: false },
        ],
      },
      {
        title: `What will be the output of the following code snippet?
          <br/>
          <script type="text/javascript">
          a = 5 + "9";
          document.write(a);
          </script>`,
        complexity: "High",
        options: [
          { option: "Compilation Error", isCorrect: false },
          { option: "14", isCorrect: false },
          { option: "59", isCorrect: true },
          { option: "Run time error", isCorrect: false },
        ],
      },
      {
        title: `What will be the output of the following code snippet?
                <br/>
                <script type="text/javascript" language="javascript">
                var a = "Scaler";
                var result = a.substring(2, 4);
                document.write(result);
                  
                </script>`,
        complexity: "Medium",
        options: [
          { option: "al", isCorrect: true },
          { option: "ale", isCorrect: false },
          { option: "cal", isCorrect: false },
          { option: "caler", isCorrect: false },
        ],
      }
    ],
  },
];

export default testLibrary;
