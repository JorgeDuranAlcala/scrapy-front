/**
 * This function generates a random DNI, and it is used to make the DNI generation easer when you are creatin a new user
 * El Documento Nacional de Identidad (DNI), emitido por la Dirección General de la Policía (Ministerio del Interior),
 * es el documento que acredita, desde hace más de 70 años, la identidad, los datos personales que en él aparecen y la nacionalidad española de su titular.
 * @param {number} n
 * @returns {string} dni
 */
export function DNIGen(n: number): string {
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'.split('')
  const reminder = n % 23
  const dni = n.toString() + letters[reminder]
  return dni
}
