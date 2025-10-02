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
  const [windowDimensions, setWindowDimensions] = useState<Size>({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    handleResize()

    const debouncedHandleResize = debounce(handleResize, delay)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
      if (typeof debouncedHandleResize.cancel === 'function') {
        debouncedHandleResize.cancel()
      }
    }
  }, [delay])

  return windowDimensions
}

export default useWindowSize