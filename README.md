This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

GitHub Actions controls deployments through `.github/workflows/ci.yml`.
`vercel.json` disables Vercel's automatic Git deployments so they cannot bypass CI.

| Event | Checks | Deployment after checks pass |
| --- | --- | --- |
| Pull request targeting `dev` or `main` | Lint, tests, build with temporary PostgreSQL | None |
| Push/merge to `dev` | Same checks | Vercel Preview using the dev database |
| Push/merge to `main` | Same checks | Vercel Production using the production database |
| Push to a feature branch without a pull request | None | None |

### One-time configuration

1. In Vercel, use the existing Next.js project with Node.js 24, production
   branch `main`, and build command `npm run build`.
2. Set `DATABASE_URL` separately in Vercel's environment variables:
   **Preview** uses the dev database; **Production** uses the production database.
   A Preview override for branch `dev` is also supported. Vercel's **Development**
   scope is for local development, not the deployed `dev` branch.
3. In GitHub, open **Settings → Secrets and variables → Actions** and add repository
   secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Create a token
   in Vercel account settings. Find the project ID in Vercel project settings and
   the team ID (used as `VERCEL_ORG_ID`) in team settings; alternatively, `vercel link`
   writes both IDs to the ignored `.vercel/project.json` file. Never commit tokens.
4. Create GitHub environments named `dev` and `production`. Restrict their deployment
   branches to `dev` and `main`, respectively. Require the `checks` job in branch
   protection for both branches; do not require the skipped `deploy` job on PRs.
5. Commit this workflow and `vercel.json` to both `dev` and `main`. Update existing
   feature branches to include `vercel.json` too: older branches without it can still
   trigger automatic Vercel deployments. To immediately prevent all automatic Git
   deployments during setup, disconnect the repository in Vercel's Git settings;
   the CLI workflow uses the project IDs and token and does not need that connection.

CI uses only its disposable PostgreSQL service. Once it passes, the deployment job
uploads the checked-out source and waits for Vercel to build and deploy it using
the selected environment. The deployment build runs on Vercel so protected database
variables do not need to be downloaded into GitHub Actions. The build
script applies Prisma migrations to that environment's database before building
Next.js, so a failed deployment build can still have applied migrations. Use
backward-compatible migrations. Deployment runs for a branch are serialized.

See [Vercel's GitHub Actions guide](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)
and [Git deployment configuration](https://vercel.com/docs/project-configuration/git-configuration).

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
