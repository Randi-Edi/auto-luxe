import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Sanity webhook payload types
interface SanityWebhookPayload {
  _type: string
  _id: string
  slug?: {
    current?: string
  }
  id?: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret for security
    const secret = request.headers.get('authorization')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    if (expectedSecret && secret !== `Bearer ${expectedSecret}`) {
      console.error('❌ Unauthorized webhook request - invalid secret')
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse webhook payload
    const body: SanityWebhookPayload = await request.json()
    const { _type, _id, slug, id } = body

    if (!_type) {
      return NextResponse.json(
        { message: 'Missing _type in webhook payload' },
        { status: 400 }
      )
    }

    console.log(`🔄 Webhook received for ${_type} with _id: ${_id}`)

    // Handle different document types
    switch (_type) {
      case 'vehicle': {
        // Revalidate vehicles listing page
        revalidatePath('/vehicles')
        revalidateTag('vehicles')

        // Revalidate specific vehicle page if slug or id is available
        const vehicleSlug = slug?.current || id || _id
        if (vehicleSlug) {
          revalidatePath(`/vehicles/${vehicleSlug}`)
        }

        // Revalidate home page since it shows featured/reserved vehicles
        revalidatePath('/')
        revalidateTag('home')

        console.log(`✅ Revalidated vehicle pages for: ${vehicleSlug}`)
        break
      }

      case 'preOrder': {
        // Revalidate pre-orders listing page
        revalidatePath('/pre-orders')
        revalidateTag('pre-orders')

        // Revalidate specific pre-order page if id is available
        const preOrderId = id || _id
        if (preOrderId) {
          revalidatePath(`/pre-orders/${preOrderId}`)
        }

        console.log(`✅ Revalidated pre-order pages for: ${preOrderId}`)
        break
      }

      case 'testimonial': {
        // Revalidate testimonials listing page
        revalidatePath('/testimonials')
        revalidateTag('testimonials')

        // Revalidate home page since it shows testimonials
        revalidatePath('/')
        revalidateTag('home')

        console.log(`✅ Revalidated testimonial pages`)
        break
      }

      default:
        console.log(`⚠️  Unknown document type: ${_type}, skipping revalidation`)
        return NextResponse.json(
          { message: `Unknown document type: ${_type}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      id: _id,
    })
  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    return NextResponse.json(
      { 
        message: 'Error processing webhook',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Allow GET for testing
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation webhook endpoint is active',
    timestamp: new Date().toISOString(),
  })
}

