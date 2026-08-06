import { createContext, useContext } from 'react'

// Kept out of AnimationContext.jsx so that file only exports a component —
// mixing component and non-component exports disables Fast Refresh for it.
export const AnimationContext = createContext(new Set())

export const SECTION_IDS = ['about', 'knowledge', 'experience', 'projects', 'contact']

export const useHasSeen = (sectionId) => useContext(AnimationContext).has(sectionId)
