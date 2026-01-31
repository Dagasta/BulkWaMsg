# Authentication Debugging Guide

## Quick Verification Steps

### 1. Check Dev Server Port
The dev server runs on **port 3004**, not 3000.

**Correct URL**: `http://localhost:3004/auth/login`
**Incorrect URL**: `http://localhost:3000/auth/login` ❌

### 2. Test API Routes

Open these URLs in your browser or use curl:

```bash
# Test basic API route
curl http://localhost:3004/api/auth/test

# Test NextAuth CSRF endpoint
curl http://localhost:3004/api/auth/csrf

# Test NextAuth providers endpoint
curl http://localhost:3004/api/auth/providers
```

Expected responses:
- `/api/auth/test`: `{"status": "ok", ...}`
- `/api/auth/csrf`: `{"csrfToken": "..."}`
- `/api/auth/providers`: `{"credentials": {...}}`

### 3. Check Login Page

1. Open browser to: `http://localhost:3004/auth/login`
2. Open browser DevTools (F12)
3. Check Console tab for errors
4. Check Network tab when submitting login form

### 4. Common Issues & Solutions

#### Issue: 404 on Login Page
**Cause**: Accessing wrong port or page doesn't exist
**Solution**: 
- Verify you're using `localhost:3004`
- Check dev server is running: `npm run dev`
- Verify file exists: `app/auth/login/page.tsx`

#### Issue: Login Form Submits but Nothing Happens
**Cause**: NextAuth API route not accessible
**Solution**:
- Test `/api/auth/csrf` endpoint
- Check browser console for errors
- Verify `NEXTAUTH_URL` in `.env` matches your URL

#### Issue: "Invalid email or password" on Correct Credentials
**Cause**: User doesn't exist in database or password mismatch
**Solution**:
- Open Prisma Studio: `npm run db:studio`
- Check if user exists in User table
- Create new account via `/auth/register`

#### Issue: Toast Notifications Don't Appear
**Cause**: Toaster component not included
**Solution**: ✅ Fixed - Toaster now included in Providers

### 5. Create Test User

If you don't have a user account:

1. Go to: `http://localhost:3004/auth/register`
2. Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Submit and verify account creation
4. Try logging in with these credentials

### 6. Environment Variables Checklist

Verify these are set in `.env`:

```bash
DATABASE_URL="postgresql://..." ✅
NEXTAUTH_URL="http://localhost:3004" ✅
NEXTAUTH_SECRET="..." ✅
```

### 7. Database Connection

Test database connection:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

### 8. Restart Dev Server

If you made changes, restart the dev server:

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

The server should start on `http://localhost:3004`

## Debugging Checklist

- [ ] Dev server is running on port 3004
- [ ] Login page accessible at `http://localhost:3004/auth/login`
- [ ] API test endpoint returns OK: `/api/auth/test`
- [ ] NextAuth CSRF endpoint works: `/api/auth/csrf`
- [ ] At least one user exists in database
- [ ] Environment variables are set correctly
- [ ] No errors in browser console
- [ ] No errors in terminal/dev server logs

## Still Having Issues?

1. Check terminal output for errors
2. Check browser console for JavaScript errors
3. Verify database connection with Prisma Studio
4. Try creating a new user account
5. Clear browser cache and cookies
6. Try in incognito/private browsing mode
