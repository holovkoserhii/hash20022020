// For automatic file reading (from github - raw)
// MAKE SURE TO UPLOAD INPUT FILES TO GITHUB FIRST

const file_a_url =
  "https://raw.githubusercontent.com/holovkoserhii/hash20022020/master/inputs/a_example.txt";
const file_b_url =
  "https://raw.githubusercontent.com/holovkoserhii/hash20022020/master/inputs/b_read_on.txt";
const file_c_url =
  "https://raw.githubusercontent.com/holovkoserhii/hash20022020/master/inputs/c_incunabula.txt";
const file_d_url =
  "https://raw.githubusercontent.com/holovkoserhii/hash20022020/master/inputs/d_tough_choices.txt";
const file_e_url =
  "https://raw.githubusercontent.com/holovkoserhii/hash20022020/master/inputs/e_so_many_books.txt";
const file_f_url =
  "https://raw.githubusercontent.com/holovkoserhii/hash20022020/master/inputs/f_libraries_of_the_world.txt";

var fileName;

async function readFile() {
  const fileToProcess = file_a_url;
  const file = await axios.get(fileToProcess);
  fileName = fileToProcess
    .split("/")
    [fileToProcess.split("/").length - 1].split(".")[0];

  const content = file.data.split("\n");
  console.log(content);
  // startAnalysis(content);
}

function downloadCsv(arr, name) {
  let newFileContent = `${arr.length}\n`;
  newFileContent += arr.join(" ");

  let hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text;charset=utf-8," + encodeURI(newFileContent);
  hiddenElement.target = "_blank";
  hiddenElement.download = `${name}.txt`;
  hiddenElement.click();
}

document.addEventListener("DOMContentLoaded", readFile);
