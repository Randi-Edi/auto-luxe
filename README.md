# Auto-Luxe Next.js

This is the Next.js version of the Auto-Luxe car website, built with Static Site Generation (SSG).

## Project Structure

```
Auto-Luxe-NextJs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── about/              # About page
│   │   ├── contact/             # Contact page
│   │   ├── faq/                # FAQ page
│   │   ├── vehicles/            # Vehicles listing
│   │   │   └── [id]/           # Vehicle detail page
│   │   ├── pre-orders/         # Pre-orders listing
│   │   │   └── [id]/           # Pre-order detail page
│   │   └── tools/               # Tools page
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── ...                 # Other components
│   ├── lib/                    # Utility functions
│   └── hooks/                  # Custom React hooks
├── public/                     # Static assets
│   ├── attached_assets/        # Vehicle images
│   └── ...                     # Other public files
└── package.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production (SSG):
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## Features

- ✅ Next.js 15 with App Router
- ✅ Static Site Generation (SSG)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ shadcn/ui components
- ✅ Responsive design
- ✅ All pages migrated from React/Vite

## Migration Notes

### Completed
- ✅ Project structure setup
- ✅ All components migrated
- ✅ All pages created
- ✅ Routing converted from wouter to Next.js
- ✅ Layout and providers setup
- ✅ Global styles migrated
- ✅ SSG configuration

### Remaining Tasks

1. **Image Paths**: Some dynamic route pages (`vehicles/[id]` and `pre-orders/[id]`) still use `@assets` imports. These need to be converted to public paths:
   - Replace `@assets/...` with `/attached_assets/...`
   - Update all image imports in these files

2. **Tools Page**: The Tools page needs to be converted to use "use client" directive if it uses client-side interactivity.

3. **Pre-orders Pages**: Similar to vehicles, need to fix image paths and routing.

4. **Testing**: Test all routes and functionality after migration.

## Configuration

- **SSG**: Configured in `next.config.js` with `output: 'export'`
- **Images**: Set to `unoptimized: true` for static export
- **TypeScript**: Configured in `tsconfig.json`
- **Tailwind**: Configured in `tailwind.config.ts`

## Build Output

The static site will be generated in the `out/` directory after running `npm run build`.



