import sharp from 'sharp'

const publicDir = `${import.meta.dirname}/../public`

const W = 1200
const H = 630
const BG = '#23273D'
const GREEN = '#27A886'
const YELLOW = '#EFCA53'
const MUTED = '#9CA0B0'
const WHITE = '#E6E8EC'

// Resize pixel art so its height fits comfortably
const art = await sharp(`${publicDir}/devleoper.png`)
  .resize({ height: 460 })
  .toBuffer({ resolveWithObject: true })

const artW = art.info.width
const artH = art.info.height

// Place the pixel art on the right with some padding
const artX = W - artW - 90
const artY = Math.round((H - artH) / 2)

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}" />

  <!-- subtle glow behind the art -->
  <ellipse cx="${artX + artW / 2}" cy="${H / 2 + 40}" rx="${artW * 0.8}" ry="60"
           fill="${GREEN}" opacity="0.18" />

  <!-- Text block on the left -->
  <text x="90" y="220" fill="${GREEN}" font-family="Verdana, sans-serif"
        font-size="26" font-weight="700" letter-spacing="2">DEVLEOPER</text>

  <text x="90" y="300" fill="${WHITE}" font-family="Verdana, sans-serif"
        font-size="64" font-weight="800">Leo Ruiz</text>

  <text x="90" y="360" fill="${MUTED}" font-family="Verdana, sans-serif"
        font-size="30">Senior Software Engineer</text>

  <text x="90" y="430" fill="${YELLOW}" font-family="Verdana, sans-serif"
        font-size="22">Java · JavaScript · Spring · React · AI-powered dev</text>

  <text x="90" y="540" fill="${MUTED}" font-family="Verdana, sans-serif"
        font-size="20">Bogotá, Colombia</text>
</svg>
`

await sharp(Buffer.from(svg))
  .composite([{ input: art.data, left: artX, top: artY }])
  .png()
  .toFile(`${publicDir}/og-banner.png`)

console.log('Wrote public/og-banner.png (1200x630)')
