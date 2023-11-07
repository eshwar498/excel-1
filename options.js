// we manage the options selection

const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedButton = document.getElementById("underline");
const fontSizeinput=document.getElementsByTagName("input")[0];
const fontFamilyDropdown = document.getElementById("fontFamilyDropdown");



// activeCell defines which cell is selected / active.
// intially it will null indicating that no cell is selected.
let activeCell = null;
let activeOptionsState;

function toggleButtonsStyle(button, isSelected) {
  if (isSelected) {
    // currently selected cell in the bold state.
    button.classList.add("active-option");
    
  } else {
    button.classList.remove("active-option");
    
  }
};

function highlightOptionButtonsOnFocus() {
  // check if the cell is in the bold state or not .
  // if (activeOptionsState.isBoldSelected) {
  //   // currently selected cell in the bold state.
  //   boldButton.classList.add("active-option");
  // } else {
  //   boldButton.classList.remove("active-option");
  // }

  toggleButtonsStyle(boldButton, activeOptionsState.isBoldSelected);

  // check if the selected cell is italic or not .
  // if (activeOptionsState.isItalicSelected) {
  //   // the current cell is italic text.
  //   italicButton.classList.add("active-option");
  // } else {
  //   italicButton.classList.remove("active-option");
  // }
  toggleButtonsStyle(italicButton, activeOptionsState.isItalicSelected);

  // check if the selected cell is underline or not .

  // if (activeOptionsState.isUnderLineSelected) {
  //   // the cell is underlined
  //   underlinedButton.classList.add("active-option");
  // } else {
  //   underlinedButton.classList.remove("active-option");
  // }
  toggleButtonsStyle(underlinedButton, activeOptionsState.isUnderLineSelected);
  toggleButtonsStyle(fontSizeinput, activeOptionsState.fontSize);
  toggleButtonsStyle(fontFamilyDropdown, activeOptionsState.fontFamily);

  // get the textAlign value
  highlightTextAlignButtons(activeOptionsState.textAlign);
  // highlightTextAlignButtons("start" | "right" | "center")
};

// below function will be triggered whenever cell is focused.
function onCellFocus(e) {
  // whenever a cell is focused change the activeCell value to be the id of cell.
  if (activeCell && activeCell.id === e.target.id) {
    // previously selected cell is equal to the currently selected cell.
    return;
  }
  // whenever a cell is focused change the activeCell value to be the id of cell.
  activeCell = e.target; //activeCell is holding my enitre obj (<div id=  containtable etc)
  activeCellElement.innerText = e.target.id;

  // intialise the state of this cell.
  const computedStyle = getComputedStyle(activeCell); //gives particual cell htrml elemnt(i.e div for understanding clg(computed style,activecell))

  activeOptionsState = {
    fontFamily: computedStyle.fontFamily !="Times New Roman",
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicSelected: computedStyle.fontStyle === "italic",
    isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize!="16px"
  };
  
  highlightOptionButtonsOnFocus();
};

function onChangeSize() {
  // This function will be triggered when the user changes the input field.
  if (activeCell) {
    if (activeOptionsState.fontSize !== fontSizeInput.value + "px") {
      // Apply the user-defined font size
      activeCell.style.fontSize = fontSizeInput.value + "px";
      activeOptionsState.fontSize = fontSizeInput.value + "px";
    } else {
      // Reset the font size to the default (16px)
      activeCell.style.fontSize = "16px";
      activeOptionsState.fontSize = "16px";
    }
  }
};

function onChangeFontFamily() {
  if (activeCell) {
    const selectedFontFamily = fontFamilyDropdown.value;
    if (activeOptionsState.fontFamily !== selectedFontFamily) {
      // Apply the user-defined font family
      activeCell.style.fontFamily = selectedFontFamily;
      activeOptionsState.fontFamily = selectedFontFamily;
    } else {
      // Reset the font family to the default (timesnew roman)
      activeCell.style.fontFamily = "Times New Roman";
      activeOptionsState.fontFamily = "Times New Roman";
    }
      
  }
};


function onClickBold(boldButton) {
  // this function will be triggered when user clicks on the Bold button.
  /**
   * 1. toggle `active-option` class for the button.
   * 2. get the selected cell.
   */
  
  boldButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isBoldSelected === false) {
      // make the text to bold
      activeCell.style.fontWeight = "600";
    } else {
      // make the text to normal
      activeCell.style.fontWeight = "400";
    }
    activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
  }
  // console.log(activeOptionsState);
};

function onClickItalic(italicButton) {
  /**
   * 1. toggle the active-option class for the italic button.
   */
  italicButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isItalicSelected) {
      // the text already italic.
      activeCell.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
    }
    activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
  }
};

function onClickUnderline(underlinedButton) {
  underlinedButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isUnderLineSelected) {
      // if the text is underlined => none
      activeCell.style.textDecoration = "none";
    } else {
      activeCell.style.textDecoration = "underline";
    }
    activeOptionsState.isUnderLineSelected =
      !activeOptionsState.isUnderLineSelected;
  }
};

function highlightTextAlignButtons(textAlignValue) {
  // textAlignValue === "start" => we have to highlight only left button
  // textAlignValue === "right" => we have to highlight only right button
  // textAlignValue === "center" => we have to highlight only center button
  for (let i = 0; i < textAlignElements.length; i++) {
    if (textAlignElements[i].getAttribute("data-value") === textAlignValue) {
      textAlignElements[i].classList.add("active-option");
    } else {
      textAlignElements[i].classList.remove("active-option");
    }
  }
};

function onClickTextAlign(textAlignButton) {
  let selectedValue = textAlignButton.getAttribute("data-value");
  highlightTextAlignButtons(selectedValue);

  // change the text alignment.
  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionsState.textAlign = selectedValue;
  }
};


function onChangeTextColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.color = selectedColor;
    activeOptionsState.color = selectedColor;
  }
};

function onChangeBackgroundColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.backgroundColor = selectedColor;
    activeOptionsState.backgroundColor = selectedColor;
  }
};





