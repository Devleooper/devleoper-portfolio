import { useEffect, useState } from 'react'

export default function WalkingCat({ name, className }) {
  const frames = [
    `/animations/${name}-1.png`,
    `/animations/${name}-2.png`,
    `/animations/${name}-3.png`,
    `/animations/${name}-4.png`,
  ]
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % 4), 150)
    return () => clearInterval(id)
  }, [])

  // All frames stay mounted and we just toggle which one is visible. Swapping
  // `src` on a single <img> made the browser hit the network on every frame:
  // files copied from public/ keep stable names, so they don't get the long
  // max-age that hashed build output does, and each swap fired a revalidation
  // request. In the network tab that looked like the PNGs downloading on loop.
  return (
    <div className={`cat-walk cat-walk--${name} ${className}`}>
      {frames.map((src, i) => (
        <img key={src} src={src} alt="" aria-hidden="true" hidden={i !== frame} />
      ))}
    </div>
  )
}
