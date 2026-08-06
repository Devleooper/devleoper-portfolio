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
  // `src` on a single <img> made the browser re-request every frame (the dev
  // server serves public/ with no-cache), which showed up as an endless loop
  // of PNG requests in the network tab.
  return (
    <div className={`cat-walk cat-walk--${name} ${className}`}>
      {frames.map((src, i) => (
        <img key={src} src={src} alt="" aria-hidden="true" hidden={i !== frame} />
      ))}
    </div>
  )
}
