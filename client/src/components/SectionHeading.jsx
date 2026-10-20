export default function SectionHeading({ eyebrow, title, lede, id }) {
  return (
    <div className="section-head">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </div>
  )
}
