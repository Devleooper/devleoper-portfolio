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

  return (
    <div className={`cat-walk cat-walk--${name} ${className}`}>
      <img src={frames[frame]} alt="" aria-hidden="true" />
    </div>
  )
}
