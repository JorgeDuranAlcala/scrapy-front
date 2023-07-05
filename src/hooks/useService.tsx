import { useCallback, useState } from 'react'

type SwaggetError = {
  message: string
  code: string
}

type SwaggetErrorObject = {
  [key: string]: SwaggetError[]
}

/**
 *
 * Como parametro se pasa una funcion que retorne un callback, idealmente proveniente de la carpeta @/services
 *
 * se usa a funcion call() que retorna este hook en vez de el servicio mismo
 *
 * ### ejemplo de uso:
 *
 * ```jsx
 * const {call, loading, response, error} = useService(serviceToSomeEndpoint)
 *
 * useEffect(()=>{
 *
 *    //este hook ya se encarga de la logica del useState de "cargando"
 *    if(loading)return;
 *
 *    //Los parametros pasados corresponderian a los que
 *    //pasarias a serviceToSomeEndpoint, por ejemplo
 *    call([param1,param2])
 * },[])
 *
 * return <ul>
 *    {
 *      //se puede usar la variable "response" del hook para administrar la respuesta
 *      //absoluta retornada por el servicio, esta se actualizará cada vez que se haga
 *      //un llamado a la funcion "call()"
 *      response.results.length>0&&
 *      response.results.map((article)=><li>{article.name}: {article.content}</li>)
 *    }
 * </ul>
 * ```
 *
 * ### Tambien si lo deseas puedes reenombrar los valores retornados para usar mas de un useService
 * ```jsx
 *
 *  const {
 *    call:fooCall,
 *    loading:fooLoading,
 *    response:fooResponse,
 *    error:fooError
 *  } = useService(serviceFoo)
 *
 *  const {
 *    call:barCall,
 *    loading:barLoading,
 *    response:barResponse,
 *    error:barError
 *  } = useService(serviceBar)
 * ```
 */
function useService<ServiceToUse extends (...args: any) => Promise<unknown>>(service: ServiceToUse) {
  const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState<Awaited<ReturnType<ServiceToUse>> | null>(null)

  const [error, setError] = useState<SwaggetErrorObject | null>(null)

  const call = useCallback(
    async (...callArgs: Parameters<ServiceToUse> | undefined[]): Promise<Awaited<ReturnType<ServiceToUse>>> => {
      //Validando que la funcion tenga argumentos
      const argsToUse = [...(callArgs ? callArgs : [])]

      // if (
      //   !argsToUse ||
      //   argsToUse.length == 0 ||
      //   argsToUse.every(a => a === undefined)
      // ) {
      //   if (!args)
      //     throw new Error(
      //       "useService, call: you didn't provided arguments for the service " +
      //         "returned by the hook, if you want " +
      //         "to make a fetch without parameters, you gotta pass an empty array " +
      //         "as second parameter in the hook call like " +
      //         "this: const {} = useService(serviceForSomething,[])"
      //     )

      //   argsToUse = [...args]
      // }

      //Preparacion antes de enviar
      setLoading(true)
      setResponse(null)
      setError(null)

      let response: Awaited<ReturnType<ServiceToUse>>
      try {
        // Fetch exitoso
        //////////////////////////////////
        //@ts-ignore
        response = await service(...argsToUse)
        setLoading(false)

        //@ts-ignore
        setResponse(response)
        return response

      } catch (error) {
        // En caso de error
        //////////////////////////////////
        setLoading(false)

        //@ts-ignore
        response = error

        //@ts-ignore
        setError(error)
        throw error
      }
    },
    [service]
  )

  return {
    call,
    loading,
    response,
    error
  }
}

export default useService
