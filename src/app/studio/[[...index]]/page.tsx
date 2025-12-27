'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { useEffect } from 'react'

// Force dynamic rendering for Studio (required for Sanity Studio)
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export default function StudioPage() {
  // Suppress React 19 prop warnings for Sanity Studio
  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('disableTransition') &&
        args[0].includes('DOM element')
      ) {
        // Suppress this specific warning
        return
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return <NextStudio config={config} />
}

