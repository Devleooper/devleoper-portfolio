# 👾 Devleoper Portfolio

Hey! This is my personal portfolio — built to show who I am, what I've worked on, and how to reach me. It's a work in progress, but a fun one.

## What's in here

- Dark / light mode with smooth theme transitions
- Pixel art cat walking animation because why not
- GitHub API integration to show my starred projects *(coming soon)*
- Contact form *(coming soon)*

## Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Running locally

Built with [Bun](https://bun.sh/), but npm works too.

```bash
# install dependencies
bun install   # or npm install

# start dev server
bun dev       # or npm run dev

# build for production
bun run build # or npm run build

# preview the production build
bun preview   # or npm run preview
```

## Project structure

```
src/
├── components/       # Shared UI (Navbar, ...)
├── sections/         # Page sections (About, Projects, Experience, Knowledge, Contact)
└── index.css         # Global styles & animations
public/
└── animations/       # Cat sprite frames and end-state images
```

## Roadmap

- [ ] GitHub API — fetch and display starred repositories
- [ ] Contact form
- [ ] Deploy

## License

MIT
