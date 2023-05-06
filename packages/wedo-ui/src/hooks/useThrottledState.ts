import { throttle } from "@wedo/utils"
import { useMemo } from "react"
import { useCallback, useRef, useState } from "react"

function isFunction<T>(val: T | (() => T)) : val is (() => T) {
  return typeof val === "function"
}

function useThrottledState<T>(initialState: T, interval = 16): [T, (val: T | (() => T)) => void] {
  const state = useRef<T>(initialState)
  const [, setVer] = useState(0)
  const setState = useMemo(() => {
    const fn = (val: (T | (() => T))) => {
      if (isFunction(val)) {
        val = val()
      } 
      state.current = val;
      setVer(x => x + 1)
    }
    return throttle(fn, interval)
  }, [])
  return 	[state.current, setState]
}

export default useThrottledState
