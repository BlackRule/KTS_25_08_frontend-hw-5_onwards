"use client"
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export interface Size {
  height: number
  width: number
}

const getWindowDimensions = (): Size => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }
  const { innerWidth: width, innerHeight: height } = window
  return { height, width }
}

const useWindowSize = (delay = 100) => {
  const [windowDimensions, setWindowDimensions] = useState<Size>(() => getWindowDimensions())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    const debouncedHandleResize = debounce(handleResize, delay)
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [delay])

  return windowDimensions
}

export default useWindowSize