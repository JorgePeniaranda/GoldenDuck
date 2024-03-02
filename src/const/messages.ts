export const ErrorsDictionary = {
  CategoryNotFount: 'La categoría ya existe',
  NoPermissions: 'Permisos insuficientes',
  UserNotFound: 'Usuario no encontrado',
  UserAlreadyExists: 'El usuario ya existe',
  IncorrectPassword: 'Contraseña incorrecta',
  NoCodeSent: 'No se ha enviado el código',
  IncorrectCode: 'El código es incorrecto',
  InsufficientBalance: 'Saldo insuficiente',
  NoLogged: 'No has iniciado sesión',
  NoBodyRequest: 'No se ha enviado ningun dato en el cuerpo de la petición',
  NoVariableEnv: (variable: string): string => `No se ha encontrado la variable de entorno "${variable}"`,
  NoEmail: 'No se ha enviado el correo electrónico',
  DatabaseConnectionError: 'Error al conectar con la base de datos',
  InvalidToken: 'El token es invalido',
  UnknownError: 'Ha ocurrido un error'
}

export const ValidationDictionary = {
  name: {
    required: 'El nombre es requerido',
    onlyLetters: 'El nombre debe contener solo letras',
    invalidType: 'El nombre debe ser un texto'
  },
  lastName: {
    required: 'El apellido es requerido',
    onlyLetters: 'El apellido debe contener solo letras',
    invalidType: 'El apellido debe ser un texto'
  },
  dni: {
    required: 'El DNI es requerido',
    invalidType: 'El DNI debe ser un número',
    length: 'El DNI debe contener 8 dígitos'
  },
  email: {
    required: 'El email es requerido',
    invalidEmail: 'El email debe ser valido',
    invalidType: 'El email debe ser un texto'
  },
  phoneNumber: {
    required: 'El número telefónico es requerido',
    invalidType: 'El número telefónico debe ser un número',
    length: 'El número telefónico debe contener 10 dígitos'
  },
  password: {
    required: 'La contraseña es requerida',
    min: 'La contraseña debe tener al menos 8 caracteres',
    max: 'La contraseña debe tener menos de 72 caracteres',
    strong: 'La contraseña debe tener una mayúscula, una minúscula, un número y un caracter especial',
    invalidType: 'La contraseña debe ser un texto'
  },
  confirmPassword: {
    required: 'Es necesario confirmar la contraseña',
    invalidType: 'La confirmación de contraseña debe ser un texto',
    match: 'Las contraseñas no coinciden'
  },
  address: {
    required: 'La dirección es requerida',
    onlyLetters: 'La dirección no puede tener caracteres especiales',
    invalidType: 'La dirección debe ser un texto'
  },
  birthDate: {
    required: 'La fecha de nacimiento es requerida',
    invalidType: 'Debe ingresar una fecha válida'
  },
  sex: {
    required: 'El sexo es requerido',
    invalidType: 'Debe ingresar una opción válida'
  }
}

export const AlertsDictionary = {
  LoginSuccess: 'Ha ingresado exitosamente',
  RegisterSuccess: 'Usuario creado con exito',
  PasswordChanged: 'Contraseña cambiada con éxito'
}
