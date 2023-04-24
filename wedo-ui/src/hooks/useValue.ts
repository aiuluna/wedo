import React, { useEffect, useState } from "react";

function useValue<T>(
  initialValue: (T | (() => T)),
  onChange: (value: T) => void
): [T, React.Dispatch<React.SetStateAction<T>>] {

  if (typeof initialValue === 'function') {
    initialValue = (initialValue as Function)()
  }

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value !== initialValue) {
      onChange(value)
    }
  }, [value])

  return [value, setValue]
}

export default useValue;