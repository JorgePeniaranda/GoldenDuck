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
