# Sanity Webhook Setup Guide

This guide explains how to set up webhooks in Sanity CMS to automatically revalidate your Next.js pages when content changes.

## Overview

When you add, edit, or delete vehicles, pre-orders, or testimonials in Sanity CMS, the webhook will automatically trigger Next.js to revalidate the affected pages, ensuring your live site shows the latest content immediately.

## Prerequisites

1. Your Next.js app must be deployed (webhooks work with production URLs)
2. You need access to your Sanity project settings

## Setup Steps

### 1. Generate a Webhook Secret

Generate a secure random string to use as your webhook secret. You can use:

```bash
# Generate a random secret
openssl rand -base64 32
```

Or use any secure random string generator.

### 2. Add Secret to Environment Variables

Add the secret to your production environment variables:

**For Vercel:**
1. Go to your project settings → Environment Variables
2. Add: `SANITY_REVALIDATE_SECRET` = `your-generated-secret`

**For other platforms:**
Add `SANITY_REVALIDATE_SECRET` to your production environment variables.

### 3. Configure Webhook in Sanity

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**

### 4. Webhook Configuration

Fill in the webhook form with these settings:

- **Name**: `Next.js Revalidation` (or any name you prefer)
- **URL**: `https://your-domain.com/api/revalidate`
  - Replace `your-domain.com` with your actual production domain
  - Example: `https://auto-luxe.vercel.app/api/revalidate`
- **Dataset**: Select your dataset (usually `production`)
- **Trigger on**: 
  - ✅ **Create**
  - ✅ **Update** 
  - ✅ **Delete**
- **Filter**: Leave empty (or use the filter below for specific document types)
- **HTTP method**: `POST`
- **API version**: `v2021-06-07` or latest
- **Secret**: Leave empty (we're using Authorization header instead)
- **HTTP Headers**: Add:
  ```
  Authorization: Bearer YOUR_WEBHOOK_SECRET
  ```
  Replace `YOUR_WEBHOOK_SECRET` with the secret you generated in step 1.

### 5. Optional: Filter for Specific Document Types

If you want to only trigger on specific document types, use this filter:

```groq
_type == "vehicle" || _type == "preOrder" || _type == "testimonial"
```

## Testing the Webhook

### Test the Endpoint

You can test if the endpoint is working by visiting:
```
https://your-domain.com/api/revalidate
```

You should see a JSON response:
```json
{
  "message": "Revalidation webhook endpoint is active",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test with a Real Webhook

1. Make a small change to a vehicle, pre-order, or testimonial in Sanity
2. Check your deployment logs to see if the webhook was received
3. Visit the affected page on your live site - it should show the updated content within seconds

## How It Works

1. **Content Change**: You edit a vehicle, pre-order, or testimonial in Sanity
2. **Webhook Trigger**: Sanity sends a POST request to `/api/revalidate`
3. **Security Check**: The endpoint verifies the Authorization header matches your secret
4. **Revalidation**: Next.js invalidates the cache for affected pages:
   - **Vehicles**: `/vehicles` and `/vehicles/[slug]` and home page
   - **Pre-Orders**: `/pre-orders` and `/pre-orders/[id]`
   - **Testimonials**: `/testimonials` and home page
5. **Fresh Content**: Next request to those pages fetches fresh data from Sanity

## Supported Document Types

The webhook currently handles:
- ✅ `vehicle` - Revalidates vehicle listing and detail pages
- ✅ `preOrder` - Revalidates pre-order listing and detail pages  
- ✅ `testimonial` - Revalidates testimonial listing and home page

## Troubleshooting

### Webhook Not Working

1. **Check Environment Variable**: Ensure `SANITY_REVALIDATE_SECRET` is set in production
2. **Verify URL**: Make sure the webhook URL is correct and accessible
3. **Check Authorization Header**: Ensure the header format is `Bearer YOUR_SECRET`
4. **Check Logs**: Look at your deployment logs for webhook errors
5. **Test Endpoint**: Visit `/api/revalidate` to ensure the route is accessible

### Pages Not Updating

1. **Check Webhook Logs**: Sanity shows webhook delivery status in the webhook settings
2. **Verify Document Type**: Ensure the document `_type` matches exactly (case-sensitive)
3. **Check Cache Tags**: Verify the fetch functions are using the correct cache tags
4. **Manual Revalidation**: You can manually trigger revalidation by visiting the endpoint

### Security Issues

- Never commit your `SANITY_REVALIDATE_SECRET` to version control
- Use a strong, random secret
- The webhook will work without a secret in development, but should always have one in production

## Advanced: Multiple Environments

If you have staging and production environments, create separate webhooks:

- **Production**: `https://your-domain.com/api/revalidate`
- **Staging**: `https://staging.your-domain.com/api/revalidate`

Use different secrets for each environment.

## Support

If you encounter issues:
1. Check the webhook delivery logs in Sanity
2. Check your Next.js deployment logs
3. Verify all environment variables are set correctly
4. Test the endpoint manually using the GET method

