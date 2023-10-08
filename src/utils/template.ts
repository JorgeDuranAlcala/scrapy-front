/*
 *  to place the accepted url's
 *  to call the templates
 */
export const templateUrl = {
  '/listings/yaencontre/': 'post',
  '/users/': 'user'
}

export const getTemplateNameByUrl = (name: string) =>
  Object.keys(templateUrl).includes(name) ? templateUrl[name as keyof typeof templateUrl] : null
