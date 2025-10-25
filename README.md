# Tasks app

- **Backend:** NestJS (with Prisma ORM)  
- **Database:** SQLite (via local file)  

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone <your-repo-url>
```

### 3. Backend Setup (NestJS)
```bash
cd backend
npm install

```
## Create .env
```bash
DATABASE_URL="file:./dev.db"
PORT=5200
```
## Run db and migration
```bash
npx prisma init
npx prisma migrate dev --name init
npm run seed
```
