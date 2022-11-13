import $ from "jquery";

const checkNext = (cantInputs) => { // Falta correr los onchange para verificar inputs
  let inputsList = $("input");
  if(cantInputs != inputsList.length && !(cantInputs === undefined)){
    alert("Faltan Datos");
    window.location = "/";
  }
  for (let i = 0; i < inputsList.length; i++) {
    if (inputsList[i].value === ""){
      $(inputsList[i]).addClass("wrong");
      return [1, inputsList[i].placeholder, inputsList[i].name];
    }
    if ($(inputsList[i]).hasClass("wrong")) {
      $(inputsList[i]).focus();
      return [2, inputsList[i].placeholder, inputsList[i].name];
    }
  }
  return 0;
};
const typingInput = (e, lenght = 1, strict = false, typeDato = "string") => {
  if (checkTypeInput(e.target.value, typeDato))
    $(e.target).addClass("wrong");
  else if (
    (strict && e.target.value.length === lenght) ||
    (!strict && e.target.value.length >= lenght)
  ) {
    $(e.target).removeClass("wrong");
  } else $(e.target).addClass("wrong");
};

const checkTypeInput = (valueInput, typeDato) => {
  if (typeDato === "int" && !valueInput.match(/^[0-9]+$/)) return true;
  if (typeDato === "text" && !valueInput.match(/^[a-zA-Z]+$/)) return true;
  if (typeDato === "string" && !valueInput.match(/^[a-zA-Z0-9]+$/)) return true;
  if (
    typeDato === "email" &&
    !valueInput.match(
      /^([a-zA-Z0-9_.])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9)]{2,4})+$/
    )
  )
    return true;
};

const functionExport = { checkNext, typingInput };

export default functionExport;
