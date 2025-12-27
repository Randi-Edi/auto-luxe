# Troubleshooting: Data Not Showing

If data is not appearing on your website, follow these steps:

## Step 1: Check Environment Variables

Make sure you have a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# REQUIRED if your dataset is PRIVATE:
SANITY_API_READ_TOKEN=your-read-token-here
```

**⚠️ Important:** If your Sanity dataset is **private**, you MUST add `SANITY_API_READ_TOKEN` with Viewer permissions, otherwise data won't load!

**To verify:**
1. Check if `.env.local` exists in the project root
2. Verify the Project ID is correct (get it from https://sanity.io/manage)
3. Restart your dev server after adding/changing environment variables

## Step 2: Check if Data Exists in Sanity

1. Open Sanity Studio: `http://localhost:3000/studio`
2. Check if you have content in:
   - **Vehicles** - Should have vehicle listings
   - **Hero Section** - Should have hero content
   - **Hero Images** - Should have hero slider images
   - **Testimonials** - Should have testimonials
   - **Features** - Should have "Why Choose Us" features

## Step 3: Add Data to Sanity

If Sanity Studio is empty, you need to add content:

### Option A: Run Migration Script
```bash
npm run migrate
```

This will import all existing mock data to Sanity.

### Option B: Add Data Manually
1. Open Sanity Studio
2. Create new documents for each content type
3. Fill in the required fields
4. Publish the documents

## Step 4: Check Browser Console

1. Open your website in the browser
2. Open Developer Tools (F12)
3. Check the Console tab for errors
4. Look for warnings about missing Sanity Project ID

## Step 5: Verify Sanity Connection

Check if your Sanity project is accessible:

1. Go to https://sanity.io/manage
2. Select your project
3. Verify the Project ID matches your `.env.local` file
4. Check the dataset name (usually "production")

## Step 6: Check Network Requests

1. Open Developer Tools → Network tab
2. Refresh the page
3. Look for requests to `api.sanity.io`
4. Check if they're successful (status 200) or failing

## Common Issues

### Issue: "Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set"
**Solution:** Add the Project ID to `.env.local` and restart the dev server

### Issue: Empty arrays returned (no data)
**Solution:** 
- Check if data exists in Sanity Studio
- Run the migration script: `npm run migrate`
- Or manually add content in Sanity Studio

### Issue: Data exists in Sanity but not showing on website
**Solution:**
- Restart the dev server
- Clear browser cache
- Check if documents are published (not drafts)
- **If dataset is private:** Make sure `SANITY_API_READ_TOKEN` is set with Viewer permissions

### Issue: Dataset is private and data won't load
**Solution:**
1. Go to https://sanity.io/manage → Your Project → API → Tokens
2. Create a new token with **Viewer** permissions
3. Add it to `.env.local` as `SANITY_API_READ_TOKEN=your-token`
4. Restart the dev server
5. The token is required for private datasets to allow read access

### Issue: Images not loading
**Solution:**
- Upload images in Sanity Studio
- Check image references in documents
- Verify images are published

## Quick Test

To test if Sanity is connected:

1. Open browser console
2. Run: `console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)`
3. Should show your project ID (in browser, not in Node.js context)

Or check the Network tab for requests to `cdn.sanity.io` or `api.sanity.io`

## Still Not Working?

1. **Check the terminal** for any error messages
2. **Verify your Sanity project** is active and accessible
3. **Check dataset name** matches in `.env.local` and Sanity
4. **Restart everything:**
   ```bash
   # Stop the dev server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

