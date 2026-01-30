# Local PostgreSQL Setup for BulkWaMsg

## Quick Setup Steps

### Step 1: Create the Database

Open a new PowerShell terminal and run ONE of these commands:

**Option A: If you know your PostgreSQL password:**
```powershell
psql -U postgres -c "CREATE DATABASE bulkwamsg;"
```
(Enter your PostgreSQL password when prompted)

**Option B: If you don't remember the password:**
```powershell
# Create database using Windows authentication
createdb bulkwamsg
```

**Option C: Using pgAdmin (GUI):**
1. Open pgAdmin (search for it in Windows start menu)
2. Connect to your PostgreSQL server
3. Right-click on "Databases"
4. Click "Create" → "Database"
5. Name it: `bulkwamsg`
6. Click "Save"

### Step 2: Update Your Password in .env (If Needed)

If your PostgreSQL password is NOT "postgres", update the `.env` file:

Open `c:\Users\HP\Bulkwamsg\.env` and change this line:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bulkwamsg"
```

To:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/bulkwamsg"
```

Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

### Step 3: Push Database Schema

After creating the database, run:
```powershell
npx prisma db push
```

This will create all the tables (User, Campaign, Contact, etc.)

### Step 4: Start the App

**Terminal 1 - Next.js:**
```powershell
npm run dev
```

**Terminal 2 - WhatsApp Service:**
```powershell
npm run whatsapp:dev
```

---

## Troubleshooting

### "Password authentication failed"
- Your PostgreSQL password is not "postgres"
- Update the `.env` file with your correct password
- Or reset your PostgreSQL password

### "Database does not exist"
- Run one of the database creation commands above
- Or create it using pgAdmin

### "Connection refused"
- PostgreSQL service is not running
- Start it: `net start postgresql-x64-15` (or search "Services" in Windows and start PostgreSQL)

---

## What's Already Done ✅

- ✅ PostgreSQL 15.13 is installed
- ✅ `.env` file is configured for local PostgreSQL
- ✅ All security secrets are generated

## What You Need to Do 📋

1. Create the `bulkwamsg` database (using one of the options above)
2. Update password in `.env` if needed
3. Run `npx prisma db push`
4. Start the app with `npm run dev`

That's it! 🚀
