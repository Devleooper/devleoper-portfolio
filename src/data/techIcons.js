import {
  SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiSpring, SiReact, SiAngular, SiNestjs, SiExpress, SiFlutter,
  SiGit, SiDocker, SiGooglecloud, SiFirebase, SiLinux,
  SiClaude, SiOpenai,
  SiPostgresql, SiMysql, SiMongodb,
  SiDart, SiPython, SiGo,
} from 'react-icons/si'
import { FaAws, FaJava } from 'react-icons/fa'

// Single source of truth for every tech badge across the site.
// `githubLanguage` is the exact string GitHub's /languages endpoint returns,
// used to map repo languages → an icon. Skills without it (frameworks, tools,
// cloud) are still part of the registry so Knowledge can render them.
export const TECH = {
  // Languages
  java:       { name: 'Java',       icon: FaJava,       color: '#EA2D2E', githubLanguage: 'Java' },
  javascript: { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', githubLanguage: 'JavaScript' },
  typescript: { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', githubLanguage: 'TypeScript' },
  html:       { name: 'HTML',       icon: SiHtml5,      color: '#E34F26', githubLanguage: 'HTML' },
  css:        { name: 'CSS',        icon: SiCss,        color: '#1572B6', githubLanguage: 'CSS' },
  dart:       { name: 'Dart',       icon: SiDart,       color: '#0175C2', githubLanguage: 'Dart' },
  python:     { name: 'Python',     icon: SiPython,     color: '#3776AB', githubLanguage: 'Python' },
  go:         { name: 'Go',         icon: SiGo,         color: '#00ADD8', githubLanguage: 'Go' },

  // Frameworks
  spring:  { name: 'Spring',  icon: SiSpring,  color: '#6DB33F' },
  react:   { name: 'React',   icon: SiReact,   color: '#61DAFB' },
  angular: { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  nest:    { name: 'NestJS',  icon: SiNestjs,  color: '#E0234E' },
  express: { name: 'Express', icon: SiExpress, color: '#888888' },
  flutter: { name: 'Flutter', icon: SiFlutter, color: '#02569B' },

  // Tools
  git:      { name: 'Git',      icon: SiGit,         color: '#F05032' },
  docker:   { name: 'Docker',   icon: SiDocker,      color: '#2496ED' },
  aws:      { name: 'AWS',      icon: FaAws,         color: '#FF9900' },
  gcp:      { name: 'GCP',      icon: SiGooglecloud, color: '#4285F4' },
  firebase: { name: 'Firebase', icon: SiFirebase,    color: '#FFCA28' },
  linux:    { name: 'Linux',    icon: SiLinux,       color: '#888888' },
  claude:   { name: 'Claude',   icon: SiClaude,      color: '#D97757' },
  codex:    { name: 'Codex',    icon: SiOpenai,      color: '#10A37F' },

  // Databases
  postgresql: { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  mysql:      { name: 'MySQL',      icon: SiMysql,      color: '#4479A1' },
  mongo:      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
}

// Grouped skill keys for the Knowledge section (order matters for display).
export const SKILL_CATEGORIES = [
  { categoryKey: 'languages',  keys: ['java', 'javascript', 'typescript', 'html', 'css'] },
  { categoryKey: 'frameworks', keys: ['spring', 'react', 'angular', 'nest', 'express', 'flutter'] },
  { categoryKey: 'tools',      keys: ['git', 'docker', 'aws', 'gcp', 'firebase', 'linux', 'claude', 'codex'] },
  { categoryKey: 'databases',  keys: ['postgresql', 'mysql', 'mongo'] },
]

// GitHub language string → registry entry. Used by the Projects section.
const LANGUAGE_TO_KEY = Object.fromEntries(
  Object.entries(TECH)
    .filter(([, v]) => v.githubLanguage)
    .map(([k, v]) => [v.githubLanguage, k])
)

export function getTechByLanguage(language) {
  const key = LANGUAGE_TO_KEY[language]
  return key ? { key, ...TECH[key] } : null
}
