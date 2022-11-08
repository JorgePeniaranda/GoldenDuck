import $ from "jquery";

const checkNext = () => {
  checkInputs();
  let inputsList = $("input");
  for (let i = 0; i < inputsList.length; i++) {
    if ($(inputsList[i]).hasClass("wrong")) {
      console.log(inputsList[i]);
      $(inputsList[i]).focus();
      return false;
    }
  }
  return true;
};
const checkInputs = () => {
  let inputsList = $("input");
  for (let i = 0; i < inputsList.length; i++) {
    if (inputsList[i].value === "") $(inputsList[i]).addClass("wrong");
  }
};
const typingInput = (e, lenght = 1, strict = false, typeDato = "string") => {
  if (checkTypeInput(e.target.value, typeDato))
    $(e.target).addClass("wrong"); /* Pasar esto a una funcion 'tipo de dato' para meter email */
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
