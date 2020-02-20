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

const getData = contentArray => {
  if (contentArray[contentArray.length - 1] === "") {
    contentArray.pop();
  }
  const bookScores = contentArray[1].split(" ");
  const books = bookScores.map((score, id) => ({
    id: String(id),
    score: parseInt(score, 10)
  }));
  const daysToScan = +contentArray[0].split(" ")[2];
  const libsRaw = [];
  for (let i = 2; i < contentArray.length; i += 2) {
    libsRaw.push(`${contentArray[i]} ${contentArray[i + 1]}`);
  }
  if (libsRaw[libsRaw.length - 1].split(" ").length < 3) {
    libsRaw.pop();
  }
  const unsortedLibraries = libsRaw.reduce((accum, elem, index) => {
    const rawLib = elem.split(" ");
    const libId = index;
    const shipBooksPerDay = +rawLib[2];
    let signUpDays = +rawLib[1];
    if (signUpDays === 0) {
      signUpDays = 0.001;
    }
    rawLib.splice(0, 3);
    const bookIds = rawLib;
    const importance1 = (shipBooksPerDay * bookIds.length) / signUpDays;

    const lib = { libId, shipBooksPerDay, signUpDays, bookIds, importance1 };
    accum.push(lib);
    return accum;
  }, []);
  const libraries = unsortedLibraries.sort((a, b) => {
    if (a.importance1 > b.importance1) {
      return -1;
    }
    if (a.importance1 < b.importance1) {
      return 1;
    }
    return 0;
  });
  return { libraries, daysToScan, books };
};

async function readFile() {
  const fileToProcess = file_c_url;
  const file = await axios.get(fileToProcess);
  fileName = fileToProcess
    .split("/")
    [fileToProcess.split("/").length - 1].split(".")[0];

  const content = file.data.split("\n");
  const dataRaw = getData(content);
  // console.log(dataRaw);
  startAnalysis(dataRaw);
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
