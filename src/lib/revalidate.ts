/**
 * Revalidation time in seconds
 * Reads from REVALIDATE_TIME environment variable
 * Defaults to 3600 seconds (1 hour) if not set
 * 
 * Note: This is a helper function. For Next.js revalidate exports,
 * use the inline computation: process.env.REVALIDATE_TIME ? parseInt(process.env.REVALIDATE_TIME, 10) : 3600
 */
export function getRevalidateTime(): number {
  return process.env.REVALIDATE_TIME
    ? parseInt(process.env.REVALIDATE_TIME, 10)
    : 3600
}

