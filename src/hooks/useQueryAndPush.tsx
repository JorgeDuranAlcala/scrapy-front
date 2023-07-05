import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface useQueryAndPushOptions {
  // removeUsedQueryParamsOnPathChange?: boolean
}

/**
 * -----------------------------
*
 * ### Use example
 * 
 * ```js
 *
 * function someComponent({}: TSomeComponent) {
 *   const { query, pushSingleQuery } = useQueryAndPush()
 * 
 *   return (
 *     <>
 *       <h3>query value:</h3>
 *       {query['value']}
 * 
 *       <input 
 *         type='text' 
 *         onChange={e => pushSingleQuery('value', e.target.value)} 
 *       />
 *     </>
 *   )
 * }
 *
 * ```
 */
function useQueryAndPush(options?: useQueryAndPushOptions) {
  const toUseOptions = useMemo(
    () => ({ /* removeUsedQueryParamsOnPathChange: false, */ ...(options || {}) }),
    [options]
  )

  const { push, query } = useRouter()

  const [usedQueryParams, setUsedQueryParams] = useState<string[]>([])

  const pushRemoveQuery = useCallback(
    (toRemove: string | string[]) => {
      // let newQuery = query
      // delete newQuery[toRemove]

      const toRemoveToUse = Array.isArray(toRemove) ? toRemove : [toRemove]

      push({
        query: {
          // basicamente esto filtra la entrada a remover
          ...Object.entries(query).reduce((prev, [key, val]) => {
            if (!toRemoveToUse.includes(key))
              return {
                ...prev,
                [key]: val
              }
            return prev
          }, {})
        }
      })
    },
    [push, query]
  )

  /**
   * if you pass null as new value, the entry itself deletes
   */
  const pushSingleQuery = useCallback(
    (param: string, newValue: string | null) => {
      if (newValue === null) return pushRemoveQuery(param)

      // if (toUseOptions?.removeUsedQueryParamsOnPathChange) setUsedQueryParams(p => [...p, param])

      push({
        query: {
          ...query,
          [param]: newValue
        }
      })
    },
    [push, query, pushRemoveQuery, setUsedQueryParams /*  toUseOptions?.removeUsedQueryParamsOnPathChange */]
  )

  // useEffect(() => {
  //   return () => {
  //     // if (toUseOptions.removeUsedQueryParamsOnPathChange) pushRemoveQuery(usedQueryParams)
  //   }
  // }, [toUseOptions, pushRemoveQuery, usedQueryParams])

  return {
    query,
    pushSingleQuery,
    pushRemoveQuery
  }
}

export default useQueryAndPush
