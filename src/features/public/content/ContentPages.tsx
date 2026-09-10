import Link from "next/link"
import { Badge } from "@/components/ui"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { PageHero } from "../components/PageHero"
import { PublicState } from "../components/PublicState"
import { ResponsiveImage } from "../components/ResponsiveImage"
import { contentRecords } from "../mocks/public-data"

type ContentKind = "knowledge" | "news"

const heroByKind = {
  knowledge: {
    title: "องค์ความรู้",
    description: "คำแนะนำที่นำไปใช้ได้สำหรับผู้สูงอายุ ครอบครัว และผู้ดูแล",
    image: {
      id: "PUB-HERO-KNOWLEDGE-01",
      src: "/img/PUB-HERO-KNOWLEDGE-01.png",
      width: 1536,
      height: 1024,
      alt: "ผู้สูงอายุและครอบครัวเรียนรู้ร่วมกันในพื้นที่ชุมชน",
    },
  },
  news: {
    title: "ข่าวและกิจกรรม",
    description: "ข่าวความเคลื่อนไหวและกิจกรรมจากโครงการและภาคี",
    image: {
      id: "PUB-HERO-NEWS-01",
      src: "/img/PUB-HERO-NEWS-01.png",
      width: 1536,
      height: 1024,
      alt: "ผู้สูงอายุและภาคีร่วมกิจกรรมในชุมชนสงขลา",
    },
  },
} as const

export function ContentListPageView({ kind }: { kind: ContentKind }) {
  const page = heroByKind[kind]
  const records = contentRecords.filter((item) =>
    kind === "knowledge" ? item.type === "องค์ความรู้" : item.type !== "องค์ความรู้",
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero description={page.description} image={page.image} title={page.title} />
      <div className="site-container public-content-shell public-content-shell--text-list">
        <div className="public-text-list">
          {records.map((item) => (
            <Link href={`/${kind}/${item.id}`} key={item.id}>
              <span>{item.type}</span>
              <strong>{item.title}</strong>
              <small>{item.publishDate}</small>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export function ContentDetailPageView({ id, kind }: { id: string; kind: ContentKind }) {
  const item = contentRecords.find((record) => record.id === id)
  const isCorrectKind =
    item && (kind === "knowledge" ? item.type === "องค์ความรู้" : item.type !== "องค์ความรู้")
  const page = heroByKind[kind]

  if (!item || !isCorrectKind) {
    return (
      <PublicState
        backHref={`/${kind}`}
        backLabel={`กลับหน้า${page.title}`}
        message="ไม่พบข้อมูลในหมวดที่ระบุ"
        title="ไม่พบเนื้อหา"
      />
    )
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="site-container public-content-shell public-content-shell--content-detail">
        <Breadcrumbs
          items={[
            { href: "/", label: "หน้าแรก" },
            { href: `/${kind}`, label: page.title },
            { label: item.title },
          ]}
        />
        <article className="article-shell article-shell--content-detail">
          <div className="content-detail__intro">
            <Badge className="badge" variant="content">
              {item.type}
            </Badge>
            <h1>{item.title}</h1>
            <p>เผยแพร่ {item.publishDate}</p>
          </div>
          <div className="article-media">
            <ResponsiveImage image={item.image} />
          </div>
          <div className="article-body article-body--content-detail">
            <p>{item.body}</p>
            <aside>
              <strong>หมายเหตุสำหรับการทดสอบ</strong>
              <p>เนื้อหาเป็นข้อมูลจำลองเพื่อทดสอบลำดับข้อมูลและการอ่านบนหน้าจอ</p>
            </aside>
          </div>
        </article>
      </div>
    </main>
  )
}
