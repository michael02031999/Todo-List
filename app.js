let enterTodo = document.getElementById("enterTodo");
let inputContainer = document.getElementById("inputContainer");
let body = document.getElementsByTagName("body");

enterTodo.addEventListener("keypress", inputText);

let count = 1;

let up = 0;

let newArray = localStorage.getItem("notes").split(",");
let newArrayOuter = localStorage.getItem("notesOuterHTML").split("</div>");

newArrayOuter = newArrayOuter.filter((element) => {
  return element !== "";
});

for (let i = 0; i < newArrayOuter.length; i++) {
  console.log(newArrayOuter[i]);
  if (newArrayOuter[i].includes("strike")) {
    console.log("TRUE");
    newArrayOuter[i] = true;
  } else {
    newArrayOuter[i] = false;
  }
}

console.log(newArrayOuter);

//console.log(newArray);

for (let i = 0; i < newArray.length; i++) {
  inputText("", newArray[i], newArrayOuter[i]);
}

function inputText(e, text, classDetermination) {
  console.log(classDetermination);

  if ((e.key === "Enter" && enterTodo.value != "") || text.length) {
    console.log("competence");

    let newNote = document.createElement("div");
    newNote.style.height = "70px";
    newNote.style.width = "400px";
    newNote.style.backgroundColor = "white";
    newNote.style.margin = "0 auto";
    newNote.style.boxShadow = "0 0 10px rgb(229, 229, 229)";

    if (classDetermination == true) {
      newNote.classList.add("strike");
    }

    if (text != undefined) {
      newNote.insertAdjacentText("beforeend", text);
    }

    newNote.insertAdjacentText("beforeend", enterTodo.value);
    newNote.classList.add("newNoteClass");
    newNote.style.textAlign = "left";
    newNote.style.verticalAlign = "baseline";
    newNote.style.paddingLeft = "30px";

    newNote.addEventListener("contextmenu", deleteFunc, false);

    newNote.addEventListener("mousedown", clicks);

    //body[0].style.transform = "translateX(-50%)";

    up = up - 35;

    body[0].style.transform = "translate(-50%," + up + "px)";
    body[0].style.height = "fit-content";

    console.log(up);
    //body[0].style.backgroundColor = "green";

    count++;
    //newNote.insertAfter(enterTodo);
    inputContainer.append(newNote);
    enterTodo.value = "";

    savethatData();
  }
}

function deleteFunc(e) {
  //count2 = up + 35;

  e.preventDefault();
  e.path[0].remove();
  //console.log(up + 35 * count2);

  //console.log(count2);

  up = up + 35;

  body[0].style.transform = "translate(-50%," + up + "px";
  body[0].style.height = "fit-content";

  console.log(up);

  savethatData();
}

let arrayOfStrike = [];

function clicks(e) {
  if (e.button == 0) {
    e.path[0].classList.toggle("strike");

    //arrayOfStrike.push(e.path[0]);

    //console.log(arrayOfStrike);
    savethatData();
  }
}

function savethatData() {
  let allNotes = document.querySelectorAll(".newNoteClass");

  //console.log(allNotes[0].innerHTML);

  console.log(allNotes);
  let arrayOfNotes = [];
  let arrayOfOuterHTML = [];

  for (let i = 0; i < allNotes.length; i++) {
    console.log(allNotes[i].outerHTML);

    arrayOfNotes.push(allNotes[i].innerHTML);
    arrayOfOuterHTML.push(allNotes[i].outerHTML);

    console.log(arrayOfOuterHTML);
    console.log(arrayOfNotes);

    //localStorage.setItem("strike");
    localStorage.setItem("notesOuterHTML", arrayOfOuterHTML);
    localStorage.setItem("notes", arrayOfNotes);
  }

  if (allNotes.length == 0) {
    arrayOfNotes = [];
    arrayOfOuterHTML = [];

    localStorage.setItem("notesOuterHTML", arrayOfOuterHTML);
    localStorage.setItem("notes", arrayOfNotes);
  }
}
