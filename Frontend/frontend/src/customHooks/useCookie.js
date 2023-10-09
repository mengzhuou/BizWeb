import { useState, useCallback } from "react"
import Cookies from "js-cookie"


export default function useCookie(name, defaultValue) {
  const [value, setValue] = useState(() => {
    const cookie = Cookies.get(name)
    if (cookie) return cookie
    console.log('Oh ho')
    Cookies.set(name, defaultValue)
    return defaultValue
  })


  const updateCookie = useCallback(
    (newValue, options) => {
      Cookies.set(name, newValue, options)
      setValue(newValue)
    },
    [name]
  )


  const deleteCookie = useCallback(() => {
    Cookies.set(name, null)
    setValue(null)
  }, [name])


  return [value, updateCookie, deleteCookie]
}