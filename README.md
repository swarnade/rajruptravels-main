# RajRup Travels

## Getting Started

```bash
npm run dev
```

## Package Admin Routes

- Admin package form: /admin/packages
- Public package list: /packages
- Public package detail: /packages/[slug]
- Create package API: /api/packages
- Package lookup/delete API: /api/packages/[id]

## Environment Variables

Copy [.env.example](.env.example) to .env.local and set:

- MONGODB_URI
- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_S3_BUCKET
- AWS_S3_PUBLIC_BASE_URL
