"use client"

import { useEffect, useRef, useState } from "react"

export function useVideoControl() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncState = () => setIsPaused(video.paused)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause()
    syncState()
    video.addEventListener("pause", syncState)
    video.addEventListener("play", syncState)

    return () => {
      video.removeEventListener("pause", syncState)
      video.removeEventListener("play", syncState)
    }
  }, [])

  const toggle = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      await video.play()
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
  }

  return { isPaused, toggle, videoRef }
}
