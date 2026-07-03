# Elevate Skills — Frontend

Angular 19 marketing site for **Elevate Skills**. Course catalog data comes from TalentLMS via the proxy. Login, registration, and learning all happen on **TalentLMS** (`elevateskillsadmin.talentlms.com`).

## Run locally

Requires the proxy running on port 4000. See the [root README](../README.md).

```bash
npm install
npm start    # http://localhost:4200
```

## Key files

| File | Purpose |
|------|---------|
| `src/environments/environment.ts` | LMS portal URL + API paths |
| `src/app/config/lms-urls.ts` | Login / register / course URL builders |
| `src/app/services/lms.service.ts` | External TalentLMS links for templates |
| `src/app/services/course.service.ts` | Fetches courses/categories from proxy |
| `proxy.conf.json` | Dev proxy: `/api/talentlms` → `localhost:4000` |

## LMS links (direct to TalentLMS)

| Button | Destination |
|--------|-------------|
| Login | `https://elevateskillsadmin.talentlms.com/` |
| Register | `https://elevateskillsadmin.talentlms.com/index/signup` |
| Enrol | Course `lms_url` from proxy |

Change the portal URL in `src/environments/environment.ts` and `talentlms-proxy/.env` → `PUBLIC_LMS_URL`.

## Build

```bash
npm run build
```

Output: `dist/elevate-skills-web`
