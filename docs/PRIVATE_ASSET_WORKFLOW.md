# Private source-asset workflow

The public portfolio contains only approved, optimized delivery assets required by the static site. Browser-delivered files cannot be made secret: visitors must be able to download them. The boundary here is source control and provenance, not client-side download prevention.

## Current state

- `public/media/*.mp4` and matching posters are runtime delivery assets used by the public portfolio.
- Public project screenshots are listed in `public/project-media/README.md` and are rendered by the case studies.
- Media provenance is preserved outside the public checkout after removal of `public/media/README.md`.
- `PERSONALIZATION_GUIDE.md` is no longer tracked; its private backup is outside the repository.
- No private-repository credential or client-side secret is present in the repository.

## Recommended owner-configured migration

1. Create a private repository, for example `itsmyfacade/portfolio-private-assets`.
2. Store original footage, project source captures, processing files, and provenance records there.
3. Create a repository-scoped, read-only GitHub Actions credential with Contents read permission.
4. Add it as an Actions secret named `PRIVATE_ASSET_REPO_TOKEN`.
5. Add a build step that uses an authenticated Git extra-header or GitHub App installation to fetch only an allowlisted asset manifest into the build output.
6. Validate checksums and required paths before `npm run build` and before uploading the Pages artifact.
7. Remove public delivery copies only after the private retrieval step has passed in a real workflow run.

The token must never be placed in a URL, committed file, browser bundle, or build output. The migration should be tested on a review branch first. Until the owner supplies the private repository and credential, this release keeps the approved optimized delivery files so the existing website does not break.

## Historical privacy limitation

Removing a file from the current tree does not erase prior GitHub commits, forks, caches, or mirrors. `PERSONALIZATION_GUIDE.md` was present in historical repository objects. Full removal would require a separately approved `git filter-repo` rewrite, force-pushing affected branches, and coordinating clone/fork refreshes. No history rewrite is performed by this change.
