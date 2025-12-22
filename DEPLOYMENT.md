# Vercel Deployment Guide

This guide will help you deploy your Auto-Luxe Next.js application to Vercel's free tier.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com) - it's free!)
- Your project ready to deploy

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, Bitbucket, or email

2. **Create a New Project**
   - Click "Add New Project" or "New Project"
   - If your code is on GitHub/GitLab/Bitbucket:
     - Import your repository
     - Vercel will auto-detect Next.js settings
   - If your code is local only:
     - Use Method 2 (CLI) below

3. **Configure Project Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`
   - Root Directory: `./` (default)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```
   Or use npx (no installation needed):
   ```bash
   npx vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   This will open a browser window for authentication.

3. **Deploy from Project Directory**
   ```bash
   cd "/Users/dishan/Desktop/Auto-Luxe-NextJs Latest"
   vercel
   ```

4. **Follow the Prompts**
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (for first deployment)
   - Project name? (Press Enter for default or enter custom name)
   - Directory? (Press Enter for `./`)
   - Override settings? **No** (the vercel.json file will be used)

5. **Production Deployment**
   After the first deployment, deploy to production:
   ```bash
   vercel --prod
   ```

## Project Configuration

The `vercel.json` file has been created with the following settings:
- Build Command: `npm run build`
- Output Directory: `out` (for static export)
- Framework: Next.js

## Important Notes

1. **Static Export**: Your app uses `output: 'export'` which generates static files. Vercel handles this perfectly.

2. **Free Tier Limits**:
   - 100GB bandwidth per month
   - Unlimited deployments
   - Automatic HTTPS
   - Custom domains (free tier supports)

3. **Environment Variables**: If you need environment variables later:
   - Go to Project Settings → Environment Variables
   - Add your variables
   - Redeploy

4. **Custom Domain**: After deployment:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally first
- Check build logs in Vercel dashboard

### Images Not Loading
- Verify image paths use `/attached_assets/...` format
- Check that images are in the `public/` directory

### 404 Errors
- Ensure `trailingSlash: true` is set in `next.config.js` (already configured)
- Check that all routes are properly exported

## Next Steps After Deployment

1. **Test Your Site**: Visit your Vercel URL and test all pages
2. **Set Up Custom Domain** (optional): Add your domain in project settings
3. **Enable Analytics** (optional): Free tier includes basic analytics
4. **Set Up Automatic Deployments**: Connect GitHub for automatic deployments on push

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

