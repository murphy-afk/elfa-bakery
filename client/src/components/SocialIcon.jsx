// Brand marks for the shop social profiles, drawn inline so they follow
// the color of the link around them and add no asset to the bundle.
// The mark is decorative: the anchor text next to it is what assistive
// technology announces.

const marks = {
  instagram: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="currentColor" d="M10.9 7h2.4v11.6h-2.4z M13.3 7h2.2v2.2h-2.2z M8.5 11.2h7.2v2.2H8.5z" />
    </>
  )
}

export default function SocialIcon({ network }) {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {marks[network] ?? null}
    </svg>
  )
}
