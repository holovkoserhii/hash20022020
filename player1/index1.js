var fileName;

function readFile() {
  const file = document.getElementById("file").files[0];
  fileName = file.name.slice(0, file.name.length - 3);
  const reader = new FileReader();
  reader.onload = function(event) {
    const contents = event.target.result
      .trim()
      .replace(/\n/g, ",")
      .split(",");
    // const fullField = arraysOfObjects(contents);
    startAnalysis(contents);
    return;
  };
  reader.readAsText(file);
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
