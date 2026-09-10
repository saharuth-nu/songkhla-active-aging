import { ButtonLink } from "@/components/ui"
import { PageHero } from "./PageHero"
import { PublicIcon } from "./PublicIcon"

export function PublicState({
  backHref,
  backLabel,
  message,
  title,
}: {
  backHref: string
  backLabel: string
  message: string
  title: string
}) {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero description={message} title={title} />
      <div className="site-container public-content-shell">
        <section className="public-state">
          <span aria-hidden="true">?</span>
          <h2>{title}</h2>
          <p>{message}</p>
          <ButtonLink
            className="button button--secondary"
            href={backHref}
            icon={<PublicIcon name="arrow-right" />}
            variant="secondary"
          >
            {backLabel}
          </ButtonLink>
        </section>
      </div>
    </main>
  )
}
