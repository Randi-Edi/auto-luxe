/**
 * Revalidation time in seconds
 * Reads from REVALIDATE_TIME environment variable
 * Defaults to 3600 seconds (1 hour) if not set
 */
export const REVALIDATE_TIME = process.env.REVALIDATE_TIME
  ? parseInt(process.env.REVALIDATE_TIME, 10)
  : 3600

