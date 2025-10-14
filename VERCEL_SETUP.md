# Vercel Deployment Setup

## Important: Monorepo Configuration

This project uses a monorepo structure with separate `backend/` and `frontend/` folders. You need to deploy them as **separate Vercel projects** with the correct root directory configured.

## Frontend Deployment

### Step 1: Create Vercel Project for Frontend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `katgaw/test-app2`
4. **IMPORTANT**: Before deploying, configure:

### Step 2: Configure Root Directory

In the project configuration screen:

- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `frontend` ← **CRITICAL: Set this to "frontend"**
- **Build Command**: `npm run build` (default is fine)
- **Output Directory**: `.next` (default is fine)
- **Install Command**: `npm install` (default is fine)

### Step 3: Environment Variables (Optional)

If you want to connect to a deployed backend:

- **Name**: `NEXT_PUBLIC_BACKEND_URL`
- **Value**: Your deployed backend URL (e.g., `https://your-backend.vercel.app`)

If you leave this empty, the frontend will use `http://localhost:8000` in development.

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

You'll get a URL like: `https://your-frontend.vercel.app`

---

## Backend Deployment

### Step 1: Create Vercel Project for Backend

1. Again, go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import the **same repository**: `katgaw/test-app2`

### Step 2: Configure Root Directory

In the project configuration screen:

- **Framework Preset**: Other
- **Root Directory**: `backend` ← **CRITICAL: Set this to "backend"**
- **Build Command**: Leave empty or `pip install -r requirements.txt`
- **Output Directory**: Leave empty
- **Install Command**: `pip install -r requirements.txt`

### Step 3: Environment Variables (REQUIRED)

Add the following environment variable:

- **Name**: `OPENAI_API_KEY`
- **Value**: Your OpenAI API key
- **Environments**: Select all (Production, Preview, Development)

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

You'll get a URL like: `https://your-backend.vercel.app`

---

## Update Frontend to Use Deployed Backend

After both are deployed:

1. Go to your **Frontend** project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Add or update:
   - **Name**: `NEXT_PUBLIC_BACKEND_URL`
   - **Value**: Your backend URL (e.g., `https://your-backend-abc123.vercel.app`)
4. Redeploy the frontend

---

## Verification

Once both are deployed:

1. Visit your frontend URL
2. Try generating a recipe
3. It should work! 🎉

### Troubleshooting

**Frontend Build Fails:**
- ✅ Verify Root Directory is set to `frontend`
- ✅ Check that `lib/utils.ts` exists in the repository

**Backend Fails:**
- ✅ Verify Root Directory is set to `backend`
- ✅ Ensure `OPENAI_API_KEY` is set in environment variables
- ✅ Check runtime logs for errors

**Can't Connect Frontend to Backend:**
- ✅ Ensure `NEXT_PUBLIC_BACKEND_URL` is set in frontend
- ✅ Verify backend is responding (visit `/health` endpoint)
- ✅ Check CORS is enabled in backend (it is by default)

---

## Alternative: Deploy from Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel

# Deploy backend
cd ../backend
vercel
```

The CLI will automatically detect the correct framework and configuration!

---

## Project Structure

```
test-app2/
├── backend/          ← Deploy as separate project
│   ├── api/
│   └── ...
├── frontend/         ← Deploy as separate project
│   ├── app/
│   └── ...
└── vercel.json       ← Config for rewrites (optional)
```

---

**Key Point**: The `Root Directory` setting in Vercel is critical for monorepo projects. Always set it correctly!

