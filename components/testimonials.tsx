import { profile } from "@/data/profile"
import { site } from "@/data/site"
import { testimonials } from "@/data/testimonials"
import { Reveal } from "@/components/reveal"

/**
 * Renders client/colleague testimonials plus schema.org Review markup.
 * Returns null when no testimonials are configured, so nothing ships empty
 * (real quotes are added in content/settings/testimonials.json).
 */
export function Testimonials() {
  if (testimonials.length === 0) {
    return null
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": testimonials.map((item) => ({
      "@type": "Review",
      reviewBody: item.quote,
      author: {
        "@type": "Person",
        name: item.author,
        ...(item.role ? { jobTitle: item.role } : {}),
        ...(item.organization
          ? { worksFor: { "@type": "Organization", name: item.organization } }
          : {}),
      },
      itemReviewed: {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: profile.name,
      },
    })),
  }

  return (
    <section className="snap-section testimonial-section" aria-labelledby="testimonials-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-frame">
        <Reveal>
          <h2 id="testimonials-title" className="resume-section-title">
            What people say
          </h2>
        </Reveal>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <Reveal key={`${item.author}-${item.quote.slice(0, 16)}`}>
              <figure className="testimonial-card">
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.author}
                    </a>
                  ) : (
                    item.author
                  )}
                  <span>
                    {item.role}
                    {item.organization ? ` · ${item.organization}` : ""}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
