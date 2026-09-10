"use client"

import { ButtonLink } from "@/components/ui"
import { useVideoControl } from "../hooks/useVideoControl"
import { PublicIcon } from "./PublicIcon"

export function StoryVideo() {
  const video = useVideoControl()

  return (
    <section className="story-section" id="story" aria-labelledby="story-title">
      <video
        aria-describedby="story-description"
        autoPlay
        className="story-video"
        loop
        muted
        playsInline
        poster="/video/LND-STORY-01-poster.jpg"
        preload="metadata"
        ref={video.videoRef}
      >
        <source src="/video/Group_walking_along_coastal_path_202609052355.mp4" type="video/mp4" />
      </video>
      <div className="story-overlay" aria-hidden="true" />
      <div className="site-container story-content">
        <div className="story-copy">
          <p className="eyebrow eyebrow--on-dark">Active life in Songkhla</p>
          <h2 id="story-title">สุขภาวะดี เริ่มได้จากชุมชนใกล้บ้าน</h2>
          <p id="story-description">
            ทุกก้าวเล็ก ๆ เกิดขึ้นได้ เมื่อผู้สูงอายุ ครอบครัว ทีมสุขภาพ และชุมชนเดินไปด้วยกัน
          </p>
          <ButtonLink
            className="button button--on-dark"
            href="/impact"
            icon={<PublicIcon name="arrow-right" />}
            onDark
          >
            ดูผลลัพธ์ที่เกิดขึ้น
          </ButtonLink>
        </div>
        <button className="video-control" onClick={video.toggle} type="button">
          <span>
            <PublicIcon name={video.isPaused ? "play" : "pause"} />
          </span>
          <span>{video.isPaused ? "เล่นภาพเคลื่อนไหว" : "หยุดภาพเคลื่อนไหว"}</span>
        </button>
      </div>
    </section>
  )
}
