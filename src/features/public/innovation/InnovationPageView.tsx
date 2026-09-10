import { ContentCard } from "../components/ContentCard"
import { PageHero } from "../components/PageHero"
import { innovations } from "../mocks/public-data"

const heroImage = {
  id: "PUB-HERO-INNOVATION-01",
  src: "/img/PUB-HERO-INNOVATION-01.png",
  width: 1536,
  height: 1024,
  alt: "ผู้สูงอายุและเจ้าหน้าที่ใช้เครื่องมือที่ช่วยให้เข้าถึงบริการในชุมชนได้ง่ายขึ้น",
}

export function InnovationPageView() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        description="แนวคิดและเครื่องมือที่โครงการกับภาคีทดลองใช้ในพื้นที่"
        image={heroImage}
        title="นวัตกรรมเพื่อการใช้ชีวิตอย่างมีคุณภาพ"
      />
      <div className="site-container public-content-shell">
        <p className="result-summary">พบ {innovations.length} นวัตกรรม</p>
        <div className="card-grid innovation-list-grid">
          {innovations.map((item) => (
            <ContentCard
              area={`${item.stage} · ${item.area.split("·")[0].trim()}`}
              description={item.excerpt}
              image={item.image}
              key={item.id}
              tag={item.category}
              title={item.title}
              variant="innovation"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
