# Production Deployment Guide

This guide covers deploying the Metis template to production environments with optimal performance and security.

## Pre-Deployment Checklist

### 1. Environment Preparation

- [ ] **Server Requirements**: Ensure server meets minimum requirements
- [ ] **SSL Certificate**: Set up HTTPS with valid SSL certificate
- [ ] **Domain Configuration**: Configure domain and DNS settings
- [ ] **CDN Setup**: Configure CDN for static assets (recommended)
- [ ] **Monitoring**: Set up monitoring and logging
- [ ] **Backup Strategy**: Implement backup procedures

### 2. Code Preparation

- [ ] **Environment Variables**: Configure production environment variables
- [ ] **API Endpoints**: Update API endpoints for production
- [ ] **Error Handling**: Implement proper error handling
- [ ] **Security Headers**: Configure security headers
- [ ] **Performance Optimization**: Optimize assets and code
- [ ] **Testing**: Run comprehensive tests

### 3. Build Process

- [ ] **Production Build**: Create optimized production build
- [ ] **Asset Minification**: Minify CSS, JavaScript, and HTML
- [ ] **Image Optimization**: Optimize images for web
- [ ] **Code Splitting**: Implement code splitting for large applications
- [ ] **Bundle Analysis**: Analyze bundle size and optimize

## Build Process

### Using Vite (Recommended)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

This creates optimized files in the `dist/` directory:

```
dist/
├── index.html              # Optimized HTML
├── assets/
│   ├── css/
│   │   └── main.min.css   # Minified CSS
│   ├── js/
│   │   └── main.min.js    # Minified JavaScript
│   └── images/            # Optimized images
├── icons/                 # Favicon and PWA icons
└── manifest.json          # PWA manifest
```

### Manual Build Process

If not using Vite, manually optimize assets:

```bash
# Minify CSS
npm install -g clean-css-cli
cleancss -o dist/css/main.min.css src/css/main.css

# Minify JavaScript
npm install -g terser
terser src/js/main.js -o dist/js/main.min.js -c -m

# Optimize images
npm install -g imagemin-cli
imagemin src/assets/images/* --out-dir=dist/assets/images/
```

## Deployment Strategies

### 1. Static Hosting (Recommended)

For static deployment to services like Netlify, Vercel, or AWS S3:

#### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Redirects (_redirects file)
/*    /index.html   200
```

#### Vercel

```json
{
  "name": "metis-admin",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### AWS S3 + CloudFront

```bash
# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 2. Traditional Web Server

#### Apache Configuration

```apache
# .htaccess for Apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Handle Angular/React routing
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;

    root /var/www/metis/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # HTML files
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed)
    location /api/ {
        proxy_pass http://your-api-server/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Container Deployment

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  metis:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  # Optional: Add SSL termination
  nginx-proxy:
    image: jwilder/nginx-proxy
    ports:
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs
    depends_on:
      - metis
```

#### Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metis-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: metis
  template:
    metadata:
      labels:
        app: metis
    spec:
      containers:
      - name: metis
        image: your-registry/metis:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: metis-service
spec:
  selector:
    app: metis
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: metis-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: metis-tls
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: metis-service
            port:
              number: 80
```

## Environment Configuration

### Environment Variables

Create environment-specific configuration:

```javascript
// config/production.js
const config = {
  API_URL: process.env.API_URL || 'https://api.yourdomain.com',
  CDN_URL: process.env.CDN_URL || 'https://cdn.yourdomain.com',
  ENVIRONMENT: 'production',
  DEBUG: false,
  ANALYTICS_ID: process.env.ANALYTICS_ID,
  SENTRY_DSN: process.env.SENTRY_DSN,
  VERSION: process.env.npm_package_version
}

export default config
```

### Runtime Configuration

```javascript
// runtime-config.js
window.APP_CONFIG = {
  apiUrl: '${API_URL}',
  cdnUrl: '${CDN_URL}',
  environment: '${ENVIRONMENT}',
  version: '${VERSION}'
}
```

## Performance Optimization

### 1. Asset Optimization

```bash
# Optimize images
npm install -g imagemin-cli
imagemin src/assets/images/* --out-dir=dist/assets/images/ --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant

# Optimize SVGs
npm install -g svgo
svgo src/assets/icons/*.svg --output=dist/assets/icons/

# Generate WebP images
npm install -g imagemin-webp
imagemin src/assets/images/*.{jpg,png} --out-dir=dist/assets/images/ --plugin=imagemin-webp
```

### 2. Code Splitting

```javascript
// main.js - Implement lazy loading
const loadComponent = async (componentName) => {
  const module = await import(`./components/${componentName}.js`)
  return module.default
}

// Usage
document.addEventListener('DOMContentLoaded', async () => {
  const Dashboard = await loadComponent('dashboard')
  Dashboard.init()
})
```

### 3. Bundle Analysis

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/static/js/*.js

# Or with source-map-explorer
npm install -g source-map-explorer
source-map-explorer dist/static/js/*.js
```

## Security Configuration

### 1. Content Security Policy

```html
<!-- CSP header -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourdomain.com;
">
```

### 2. Security Headers

```javascript
// Express.js example
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  next()
})
```

### 3. Environment Secrets

```bash
# Use environment variables for sensitive data
export API_KEY="your-api-key"
export DATABASE_URL="your-database-url"
export JWT_SECRET="your-jwt-secret"

# Or use a .env file (not committed to git)
echo "API_KEY=your-api-key" > .env
echo "DATABASE_URL=your-database-url" >> .env
echo "JWT_SECRET=your-jwt-secret" >> .env
```

## Monitoring and Logging

### 1. Error Tracking

```javascript
// Sentry integration
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.npm_package_version
})

// Custom error handling
window.addEventListener('error', (event) => {
  Sentry.captureException(event.error)
})
```

### 2. Performance Monitoring

```javascript
// Web Vitals
import { getLCP, getFID, getFCP } from 'web-vitals'

getLCP(console.log)
getFID(console.log)
getFCP(console.log)

// Custom performance metrics
const perfObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration)
  })
})
perfObserver.observe({ entryTypes: ['navigation', 'resource'] })
```

### 3. Analytics

```javascript
// Google Analytics 4
gtag('config', 'GA_TRACKING_ID', {
  page_title: document.title,
  page_location: window.location.href
})

// Custom event tracking
const trackEvent = (eventName, parameters) => {
  gtag('event', eventName, parameters)
}

// Usage
trackEvent('button_click', {
  button_name: 'header_search',
  page_location: window.location.pathname
})
```

## Deployment Automation

### 1. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build for production
      run: npm run build
      env:
        API_URL: ${{ secrets.API_URL }}
        ANALYTICS_ID: ${{ secrets.ANALYTICS_ID }}
    
    - name: Deploy to S3
      run: |
        aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
        aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### 2. Automated Testing

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/vendor/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

## Post-Deployment

### 1. Health Checks

```javascript
// health-check.js
const healthCheck = async () => {
  try {
    const response = await fetch('/api/health')
    const data = await response.json()
    
    if (data.status === 'healthy') {
      console.log('Application is healthy')
      return true
    }
  } catch (error) {
    console.error('Health check failed:', error)
    return false
  }
}

// Run health check every 5 minutes
setInterval(healthCheck, 5 * 60 * 1000)
```

### 2. Performance Monitoring

```javascript
// performance-monitor.js
const monitor = {
  trackPageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0]
      const metrics = {
        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime
      }
      
      // Send to analytics
      this.sendMetrics(metrics)
    })
  },
  
  sendMetrics(metrics) {
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics)
    })
  }
}

monitor.trackPageLoad()
```

### 3. Rollback Strategy

```bash
# Rollback script
#!/bin/bash
PREVIOUS_VERSION=$(aws s3 ls s3://your-backup-bucket/ | tail -2 | head -1 | awk '{print $2}')

echo "Rolling back to version: $PREVIOUS_VERSION"

# Restore from backup
aws s3 sync s3://your-backup-bucket/$PREVIOUS_VERSION s3://your-production-bucket/ --delete

# Invalidate CDN
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Rollback complete"
```

## Troubleshooting

### Common Issues

1. **Static files not loading**: Check file paths and server configuration
2. **API calls failing**: Verify CORS settings and API endpoints
3. **Poor performance**: Analyze bundle size and optimize assets
4. **Security warnings**: Review CSP headers and security settings

### Debug Tools

```javascript
// Debug mode
if (process.env.NODE_ENV === 'development') {
  window.DEBUG = true
  window.APP_STATE = {}
  
  // Expose utilities for debugging
  window.utils = {
    themeManager: window.themeManager,
    dataManager: window.dataManager,
    chartManager: window.chartManager
  }
}
```

## Best Practices

1. **Use HTTPS**: Always deploy with SSL/TLS encryption
2. **Implement CSP**: Configure Content Security Policy headers
3. **Optimize Assets**: Minify, compress, and optimize all assets
4. **Monitor Performance**: Set up monitoring and alerting
5. **Regular Updates**: Keep dependencies and security patches current
6. **Backup Strategy**: Implement automated backups
7. **Error Handling**: Implement comprehensive error handling
8. **Security Headers**: Configure all recommended security headers

---

This deployment guide provides a comprehensive approach to deploying Metis in production environments. Follow these guidelines for a secure, performant, and maintainable deployment.