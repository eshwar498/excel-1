const header = document.getElementById("header");

for(let i=65;i<=90;i++){
    let char =String.fromCharCode(i);
    const bold =document.createElement("b");
    bold.innerText=char;
    header.appendChild(bold);
}
//so whwre to append below roonumber divs?if i append to header then it comes inside header div which is wrong
// so i make a section in html after my div-header and append to it 
//so extract section to append for below for loop
const body=document.getElementById("body");
for(let rowNumber=1;rowNumber<=100;rowNumber++){
  const row = document.createElement("div");
  row.className = "row"; // <div class="row"></div>
  // inside each row we should create 27 cells one for S.No
  for (let i = 64; i <= 90; i++) {
    if (i == 64) {
      //create bold element to write Serial No or rowNumber
      const b = document.createElement("b");
      b.innerText = rowNumber;
      row.appendChild(b);
    } else {
      // create empty cell/div
      const cell = document.createElement("div");
cell.id = `${String.fromCharCode(i)}${rowNumber}`; //(used to track which cell iam targeting/focusing) dynamic and unique id. COLROW => examples: C7, M8, A3
cell.contentEditable = "true";
cell.addEventListener("focus", onCellFocus); //onfocus fuction i written in options js file
      row.appendChild(cell);
    }
  }
  body.appendChild(row);
}



