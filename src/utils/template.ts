/*
 *  to place the accepted url's
 *  to call the templates
 */
export const templateUrl = {
  user: new RegExp('^/users/.*', 'mi'),
  document: new RegExp('^/listings/yaencontre/documents/[[0-9]+/.*', 'mi'),
  post: new RegExp('^/listings/yaencontre/.*', 'mi')
}

export const getTemplateNameByUrl = (name: string) => {
  return Object.keys(templateUrl).find(item => templateUrl[item as keyof typeof templateUrl].test(name)) || null
}
