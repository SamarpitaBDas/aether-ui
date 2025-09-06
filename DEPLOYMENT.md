# Deployment Guide

## Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   \`\`\`bash
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   \`\`\`

3. **Environment Variables**
   No environment variables required for basic functionality.

4. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-project.vercel.app`

### Manual Deployment

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
\`\`\`

## Netlify Deployment

1. **Build Settings**
   \`\`\`bash
   Build command: npm run build && npm run export
   Publish directory: out
   \`\`\`

2. **Add netlify.toml**
   \`\`\`toml
   [build]
     command = "npm run build && npm run export"
     publish = "out"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   \`\`\`

## Docker Deployment

\`\`\`dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
\`\`\`

## GitHub Pages Deployment

1. **Add next.config.mjs**
   \`\`\`javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }

   export default nextConfig
   \`\`\`

2. **GitHub Actions Workflow**
   \`\`\`yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   \`\`\`

## Performance Optimization

### Build Optimization
\`\`\`bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Optimize images
npm install next-optimized-images
\`\`\`

### Caching Strategy
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
\`\`\`

## Monitoring and Analytics

### Vercel Analytics
Already included in the project. View metrics at:
- [Vercel Analytics Dashboard](https://vercel.com/analytics)

### Custom Analytics
\`\`\`typescript
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

## Troubleshooting

### Common Issues

1. **Build Failures**
   \`\`\`bash
   # Clear cache
   rm -rf .next
   npm run build
   \`\`\`

2. **Type Errors**
   \`\`\`bash
   # Check TypeScript
   npx tsc --noEmit
   \`\`\`

3. **Dependency Issues**
   \`\`\`bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

### Performance Issues
- Enable compression
- Optimize images
- Use CDN for static assets
- Implement proper caching headers
\`\`\`

```json file="" isHidden
