# Personalization guide

The portfolio contains verified identity and project information supplied by the owner. It intentionally contains no invented employment, education, certifications, awards, or resume-derived claims.

Update [`content/profile.ts`](content/profile.ts) with verified values:

- `name`: professional name.
- `headline`: concise professional positioning.
- `shortBio` and `longBio`: first-person biography.
- `email`: verified contact email. The contact link renders only when present.
- `github` and `linkedin`: verified public URLs. Links render only when present.
- `resumePath`: a reviewed PDF path under `public/`. The resume link renders only when present.
- `availability`: truthful availability statement.

Update the project facts only from verified source material in [`content/projects.ts`](content/projects.ts). Add screenshots under `public/projects/` only when they are authentic project captures. Do not describe synthetic Observatory records as production telemetry.

After personalization:

```powershell
npm run typecheck
npm run build
npm audit --audit-level=high
```
