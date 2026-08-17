import { useEffect, useState } from 'react'

/**
 * useAsync — roda `asyncFn` quando `deps` muda e expõe {data, loading, error}.
 * Usado pelos hooks de dados (useContents, useFaq, useTestimonials etc.) para
 * não repetir o mesmo boilerplate de fetch em cada página.
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    setState({ data: null, loading: true, error: null })

    asyncFn()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (active) setState({ data: null, loading: false, error })
      })

    return () => {
      active = false
    }
  }, deps)

  return state
}

export default useAsync
