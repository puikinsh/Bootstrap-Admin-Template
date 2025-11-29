# Deployment Guide

This guide covers how to deploy the Metis Admin Template to various hosting platforms.

## Table of Contents

- [Building for Production](#building-for-production)
- [Static Hosting](#static-hosting)
- [Server Deployment](#server-deployment)
- [Docker Deployment](#docker-deployment)
- [CI/CD Integration](#cicd-integration)
- [Performance Optimization](#performance-optimization)

---

## Building for Production

### Standard Build

```bash
# Install dependencies (if not already done)
npm install

# Create production build
npm run build
```

This generates optimized files in the `dist-modern/` directory:

```
dist-modern/
├── assets/
│   ├── main-[hash].js          # Main application bundle
│   ├── main-[hash].css         # Compiled CSS
│   ├── vendor-bootstrap-[hash].js
│   ├── vendor-charts-[hash].js
│   ├── vendor-ui-[hash].js
│   └── [page]-[hash].js        # Page-specific bundles
├── index.html
├── analytics.html
├── users.html
└── ... (other HTML pages)
```

### Build Output Analysis

```bash
# Preview the production build locally
npm run preview

# The preview server runs at http://localhost:4173
```

### Environment-Specific Builds

Create environment files for different deployments:

```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_ENABLE_DEMO_DATA=false

# .env.staging
VITE_API_URL=https://staging-api.yourdomain.com
VITE_ENABLE_DEMO_DATA=true
```

Build with specific environment:

```bash
# Uses .env.production
npm run build

# Uses .env.staging
npm run build -- --mode staging
```

---

## Static Hosting

### Netlify

**Option 1: Git Integration**

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist-modern`

**Option 2: Manual Deploy**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist-modern
```

**netlify.toml configuration:**

```toml
[build]
  command = "npm run build"
  publish = "dist-modern"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

**Option 1: Git Integration**

1. Import project from GitHub/GitLab
2. Framework preset: Vite
3. Output directory: `dist-modern`

**Option 2: CLI Deploy**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json configuration:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist-modern",
  "framework": "vite"
}
```

### GitHub Pages

**Using GitHub Actions:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          BASE_URL: /your-repo-name/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist-modern
```

**Configure base URL in vite.config.js:**

```javascript
export default defineConfig({
  base: process.env.BASE_URL || '/',
  // ... other config
});
```

### AWS S3 + CloudFront

**1. Create S3 Bucket:**

```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

**2. Configure for static hosting:**

```json
{
  "IndexDocument": { "Suffix": "index.html" },
  "ErrorDocument": { "Key": "index.html" }
}
```

**3. Deploy:**

```bash
npm run build
aws s3 sync dist-modern/ s3://your-bucket-name --delete
```

**4. Create CloudFront distribution** for HTTPS and CDN caching.

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase init hosting

# Deploy
npm run build
firebase deploy
```

**firebase.json:**

```json
{
  "hosting": {
    "public": "dist-modern",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

---

## Server Deployment

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/metis-admin/dist-modern;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML files - no cache
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**With SSL (Let's Encrypt):**

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # ... rest of config
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### Apache Configuration

**.htaccess:**

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

---

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist-modern /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf (for Docker)

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  metis-admin:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t metis-admin .

# Run container
docker run -d -p 80:80 metis-admin

# Or with docker-compose
docker-compose up -d
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        run: |
          # Add your deployment commands here
          echo "Deploying to production..."
```

### GitLab CI

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"

test:
  stage: test
  image: node:${NODE_VERSION}
  cache:
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run lint

build:
  stage: build
  image: node:${NODE_VERSION}
  cache:
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist-modern/
    expire_in: 1 week

deploy:
  stage: deploy
  only:
    - main
  script:
    - echo "Deploying to production..."
```

---

## Performance Optimization

### Pre-deployment Checklist

- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run build` - successful build
- [ ] Run `npm run preview` - test locally
- [ ] Check bundle sizes in build output
- [ ] Verify all pages load correctly
- [ ] Test dark/light mode
- [ ] Test on mobile devices

### Optimization Tips

**1. Analyze Bundle Size:**

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({ open: true })
  ]
});
```

**2. Enable Compression:**

Most hosting platforms handle this automatically. For custom servers, enable gzip/brotli.

**3. Use CDN for Static Assets:**

Configure your hosting to serve assets from a CDN for better global performance.

**4. Set Proper Cache Headers:**

- HTML files: `no-cache`
- JS/CSS with hashes: `max-age=31536000, immutable`
- Images: `max-age=86400`

**5. Lazy Load Images:**

```html
<img src="image.jpg" loading="lazy" alt="Description">
```

### Lighthouse Score Targets

- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

---

## Troubleshooting

### Common Issues

**1. 404 errors on page refresh**

Solution: Configure server for SPA routing (see Nginx/Apache configs above).

**2. Assets not loading**

Check the `base` option in `vite.config.js` matches your deployment path.

**3. CORS errors**

Configure your API server to allow requests from your deployment domain.

**4. Build fails**

```bash
# Clear cache and rebuild
rm -rf node_modules dist-modern
npm install
npm run build
```

---

For additional help, see the [GitHub Issues](https://github.com/puikinsh/Bootstrap-Admin-Template-3/issues) page.
