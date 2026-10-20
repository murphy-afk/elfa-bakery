// Stand in for a photograph until the owner supplies real images.
// It exposes the alt text to assistive technology through aria-label.

export default function PlaceholderImage({ label, alt, tall = false }) {
  const classes = tall ? 'ph-image ph-image-tall' : 'ph-image'

  return (
    <div className={classes} role="img" aria-label={alt}>
      <span className="ph-image-label">{label}</span>
    </div>
  )
}
