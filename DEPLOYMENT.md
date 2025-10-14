# Deployment Guide

## 🚀 Deploy to Vercel

This guide shows you how to deploy the Diet Recipe App to Vercel (both frontend and backend).

### Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/cli) installed (optional but recommended)
3. Your OpenAI API key

### Option 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy from Project Root

```bash
# From the project root directory
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Choose your account
- **Link to existing project**: No (first time)
- **What's your project's name**: diet-recipe-app (or your choice)
- **In which directory is your code located**: `./`

#### Step 4: Add Environment Variables

After deployment, add your OpenAI API key:

```bash
vercel env add OPENAI_API_KEY
```

Choose:
- **Value**: Your OpenAI API key
- **Which environments**: Production, Preview, Development (select all)

Or add it via the [Vercel Dashboard](https://vercel.com/dashboard):
1. Go to your project
2. Settings → Environment Variables
3. Add `OPENAI_API_KEY` with your key

#### Step 5: Redeploy

```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

#### Step 1: Push to GitHub

Make sure your code is pushed to GitHub (already done!).

#### Step 2: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `katgaw/test-app2`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: Leave default
   - **Output Directory**: Leave default

#### Step 3: Configure Environment Variables

Before deploying, add environment variables:

1. In the project configuration screen, expand "Environment Variables"
2. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environments**: Select all (Production, Preview, Development)

#### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

### Deployment Structure

The project is configured as a monorepo with:

```
test-app2/
├── backend/            # FastAPI backend
│   ├── app/
│   │   └── main.py    # Main application (Vercel looks for app/main.py)
│   ├── requirements.txt
│   ├── runtime.txt
│   └── vercel.json
├── frontend/           # Next.js application
│   ├── app/
│   ├── components/
│   └── package.json
└── vercel.json         # Root configuration
```

### Vercel Configuration Explained

The `vercel.json` file configures:

1. **Builds**: 
   - FastAPI backend as Python serverless function
   - Next.js frontend

2. **Routes**:
   - `/api/*` → Backend (FastAPI)
   - `/*` → Frontend (Next.js)

3. **Environment Variables**:
   - `OPENAI_API_KEY` for the backend

### Frontend Configuration

The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:8000` for API
- **Production**: Uses `/api` route (same domain)

### Testing Your Deployment

Once deployed, you'll get a URL like: `https://diet-recipe-app.vercel.app`

Test it:
1. Visit the URL in your browser
2. Select a diet type (Vegetarian or Vegan)
3. Click "Generate Recipe"
4. Recipe should appear!

### Troubleshooting

#### Backend Issues

**"OpenAI API key not configured"**
- Make sure you added the `OPENAI_API_KEY` environment variable in Vercel
- Redeploy after adding environment variables

**"Internal Server Error"**
- Check Vercel logs: Dashboard → Your Project → Deployments → Click deployment → Runtime Logs
- Ensure all Python dependencies are in `api/requirements.txt`

#### Frontend Issues

**Cannot connect to backend**
- Check that the frontend is using the correct API URL
- In production, it should use `/api`, not `http://localhost:8000`

#### Viewing Logs

```bash
# View deployment logs
vercel logs

# View specific deployment
vercel logs [deployment-url]
```

Or view logs in the Vercel Dashboard:
1. Go to your project
2. Click "Deployments"
3. Click on a deployment
4. View "Runtime Logs"

### Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed
4. Wait for DNS propagation

### Environment-Specific Variables

You can set different values for different environments:

```bash
# Production only
vercel env add OPENAI_API_KEY production

# Preview only (for PR previews)
vercel env add OPENAI_API_KEY preview

# Development only
vercel env add OPENAI_API_KEY development
```

### Updating Your Deployment

Every push to your `main` branch will automatically deploy to production if you've connected GitHub to Vercel.

Or manually redeploy:

```bash
vercel --prod
```

### Cost Considerations

**Vercel Free Tier includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Serverless function execution time limits

**Note**: OpenAI API calls will be charged separately by OpenAI based on your usage.

---

## Alternative Deployment Options

### Backend Only

If you want to deploy backend separately:

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Render:**
1. Connect your GitHub repo
2. Create a new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

### Frontend Only

Deploy only frontend to Vercel:
```bash
cd frontend
vercel
```

Then update `NEXT_PUBLIC_BACKEND_URL` environment variable to point to your backend URL.

---

## 🎉 Success!

Your Diet Recipe App should now be live and accessible worldwide!

Share your deployment URL and start generating recipes! 🍳

