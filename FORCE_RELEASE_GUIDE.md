# Comprehensive Guide: Forcing a Release with Semantic-Release

This guide provides detailed instructions for forcing a release through semantic-release in the `continuous-delivery-node-sdk` project when the automated system hasn't detected changes warranting a new version.

## Table of Contents
1. [Understanding Conventional Commits](#1-understanding-conventional-commits)
2. [Force Release Techniques](#2-force-release-techniques)
3. [Semantic-Release CLI Options](#3-semantic-release-cli-options)
4. [Configuration Modifications](#4-configuration-modifications)
5. [GitHub Actions Workflow](#5-github-actions-workflow)
6. [Manual Workflow Triggering](#6-manual-workflow-triggering)
7. [Troubleshooting Common Issues](#7-troubleshooting-common-issues)
8. [Creating Empty Commits](#8-creating-empty-commits)
9. [Verifying Release Success](#9-verifying-release-success)

---

## 1. Understanding Conventional Commits

Semantic-release uses the [Conventional Commits](https://www.conventionalcommits.org/) specification to determine version bumps. The project follows this format strictly.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types and Version Bumps

#### **PATCH Release (0.0.X)** - Bug fixes and minor changes
```bash
fix: correct typo in documentation
fix(api): resolve authentication timeout issue
perf: improve query performance
```

**Recognized types for PATCH:**
- `fix:` - Bug fixes
- `perf:` - Performance improvements
- `revert:` - Reverting previous commits

#### **MINOR Release (0.X.0)** - New features (backward compatible)
```bash
feat: add new authentication method
feat(toolchain): implement webhook support
```

**Recognized types for MINOR:**
- `feat:` - New features

#### **MAJOR Release (X.0.0)** - Breaking changes
```bash
feat!: redesign API interface

BREAKING CHANGE: The authentication method has been completely redesigned.
```

**Two ways to trigger MAJOR:**
1. Add `!` after type/scope: `feat!:` or `fix!:`
2. Include `BREAKING CHANGE:` in footer

**Example with footer:**
```bash
feat: update authentication flow

BREAKING CHANGE: The old authenticate() method has been removed.
Use the new authenticateWithToken() method instead.
```

### Other Commit Types (No Release)

These types do NOT trigger releases:
- `chore:` - Maintenance tasks
- `docs:` - Documentation only
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test updates
- `build:` - Build system changes
- `ci:` - CI configuration changes

### Scope Examples

Scopes are optional but help organize commits:
```bash
fix(toolchain): resolve API endpoint issue
feat(pipeline): add trigger configuration
docs(readme): update installation instructions
```

---

## 2. Force Release Techniques

### Method 1: Empty Commit with Release-Triggering Type

The most straightforward way to force a release without code changes:

```bash
# Force PATCH release
git commit --allow-empty -m "fix: trigger patch release"

# Force MINOR release
git commit --allow-empty -m "feat: trigger minor release"

# Force MAJOR release
git commit --allow-empty -m "feat!: trigger major release

BREAKING CHANGE: Force major version bump"
```

### Method 2: Documentation Update with Fix Type

Make a trivial documentation change and commit with `fix:`:

```bash
# Edit README.md (add a space, fix typo, etc.)
git add README.md
git commit -m "fix: update documentation formatting"
```

### Method 3: Chore Commit Reclassified as Fix

If you have maintenance work that should trigger a release:

```bash
# Instead of:
git commit -m "chore: update dependencies"

# Use:
git commit -m "fix: update dependencies to resolve security issues"
```

### Method 4: Use Release Footer

Add a special footer to force release evaluation:

```bash
git commit --allow-empty -m "chore: maintenance update

Release-As: patch"
```

**Note:** This requires the `@semantic-release/commit-analyzer` plugin configured with custom release rules, which is not currently in the project's `.releaserc`.

---

## 3. Semantic-Release CLI Options

### Dry Run Mode

Test what semantic-release would do without actually releasing:

```bash
# Using npm script (recommended)
npm run semVerDryRun

# Direct command
npx semantic-release --dry-run
```

**Output includes:**
- Detected commits since last release
- Calculated next version
- Release notes that would be generated
- Actions that would be taken

### Debug Mode

The project already has `"debug": true` in `.releaserc`, which provides verbose logging. To disable temporarily:

```bash
npx semantic-release --no-ci --debug false
```

### No CI Mode

Run semantic-release locally (requires proper authentication):

```bash
npx semantic-release --no-ci
```

**Warning:** This bypasses CI checks and should only be used for testing.

### Branch Specification

Override the branch configuration:

```bash
npx semantic-release --branches main
npx semantic-release --branches main,develop,next
```

### Skip Plugins

Skip specific plugins during execution:

```bash
# Skip GitHub release creation
npx semantic-release --no-ci --plugins @semantic-release/commit-analyzer,@semantic-release/release-notes-generator,@semantic-release/npm

# Skip npm publish
npx semantic-release --no-ci --plugins @semantic-release/commit-analyzer,@semantic-release/release-notes-generator,@semantic-release/github
```

### Environment Variables

Control behavior via environment variables:

```bash
# Dry run
SEMANTIC_RELEASE_DRY_RUN=true npx semantic-release

# Skip CI checks
SEMANTIC_RELEASE_NO_CI=true npx semantic-release

# Custom GitHub token
GH_TOKEN=your_token_here npx semantic-release
```

---

## 4. Configuration Modifications

### Current Configuration (`.releaserc`)

```json
{
  "debug": true,
  "branches": ["main"],
  "verifyConditions": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ],
  "prepare": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ],
  "publish": [
    ["@semantic-release/npm", { "pkgRoot": "dist" }],
    { "path": "@semantic-release/github" }
  ]
}
```

### Temporary Modifications to Force Release

#### Option A: Add Custom Release Rules

Create a temporary `.releaserc.json` with custom rules:

```json
{
  "debug": true,
  "branches": ["main"],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "releaseRules": [
          { "type": "chore", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "release": "patch" },
          { "type": "style", "release": "patch" }
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

**Important:** Rename back to `.releaserc` after forcing the release.

#### Option B: Lower Version Bump Threshold

Temporarily make all commit types trigger releases:

```json
{
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "releaseRules": [
          { "type": "*", "release": "patch" }
        ]
      }
    ]
  ]
}
```

#### Option C: Disable Commit Analysis

Force a release regardless of commits (dangerous):

```json
{
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "breaking": true, "release": "major" },
          { "type": "*", "release": "patch" }
        ]
      }
    ]
  ]
}
```

### Permanent Configuration Changes

If you frequently need to force releases, consider:

1. **Add release rules for documentation:**
```json
{
  "releaseRules": [
    { "type": "docs", "scope": "readme", "release": "patch" }
  ]
}
```

2. **Enable pre-release branches:**
```json
{
  "branches": [
    "main",
    { "name": "beta", "prerelease": true },
    { "name": "alpha", "prerelease": true }
  ]
}
```

---

## 5. GitHub Actions Workflow

### Current Workflow Configuration

The `.github/workflows/release.yml` workflow:

**Triggers:**
- Automatic: Push to `main` branch
- Manual: `workflow_dispatch` with optional dry-run

**Required Secrets:**
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- `NPM_TOKEN` - Must be configured in repository secrets

**Required Permissions:**
```yaml
permissions:
  contents: write      # Create releases and tags
  issues: write        # Comment on issues
  pull-requests: write # Comment on PRs
  id-token: write      # OIDC token
```

### Verifying Workflow Configuration

#### 1. Check Repository Secrets

Navigate to: `Settings` → `Secrets and variables` → `Actions`

**Required secrets:**
- `NPM_TOKEN`: Your npm authentication token
  - Get from: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
  - Type: Automation token (recommended) or Publish token
  - Scope: Read and write access

**Verify GITHUB_TOKEN:**
- Automatically provided by GitHub
- No manual configuration needed
- Permissions set in workflow file

#### 2. Check Branch Protection Rules

Navigate to: `Settings` → `Branches` → `Branch protection rules`

**For `main` branch, ensure:**
- ✅ "Require status checks to pass before merging" (optional)
- ✅ "Require branches to be up to date before merging" (optional)
- ⚠️ "Include administrators" should be OFF for semantic-release to push
- ✅ Allow force pushes: OFF (recommended)
- ✅ Allow deletions: OFF (recommended)

**Critical:** The `GITHUB_TOKEN` must have permission to push to `main`. If branch protection is too strict, semantic-release cannot commit the changelog and version bump.

#### 3. Verify Workflow Permissions

In `.github/workflows/release.yml`, confirm:

```yaml
permissions:
  contents: write        # Required for creating tags and releases
  issues: write          # Required for commenting on issues
  pull-requests: write   # Required for commenting on PRs
  id-token: write        # Required for npm provenance
```

#### 4. Check Workflow Status

View workflow runs:
- Go to `Actions` tab in GitHub
- Select `release` workflow
- Check recent runs for errors

Common issues:
- ❌ "No release published" - No commits triggered a release
- ❌ "ENOENT: no such file or directory" - Build failed
- ❌ "401 Unauthorized" - NPM_TOKEN invalid or expired
- ❌ "403 Forbidden" - Insufficient GitHub permissions

---

## 6. Manual Workflow Triggering

### Method 1: Workflow Dispatch (Dry Run)

Test the release process without publishing:

1. Navigate to: `Actions` → `release` workflow
2. Click "Run workflow" button
3. Select branch: `main`
4. Check "Run semantic-release in dry-run mode": ✅ `true`
5. Click "Run workflow"

**This will:**
- ✅ Analyze commits
- ✅ Calculate next version
- ✅ Generate release notes
- ❌ NOT publish to npm
- ❌ NOT create GitHub release
- ❌ NOT update CHANGELOG.md
- ❌ NOT create git tags

### Method 2: Workflow Dispatch (Actual Release)

Force an actual release:

1. Navigate to: `Actions` → `release` workflow
2. Click "Run workflow" button
3. Select branch: `main`
4. Check "Run semantic-release in dry-run mode": ❌ `false`
5. Click "Run workflow"

**This will:**
- ✅ Analyze commits
- ✅ Calculate next version
- ✅ Publish to npm
- ✅ Create GitHub release
- ✅ Update CHANGELOG.md
- ✅ Create git tags

### Method 3: Push to Main Branch

The standard approach:

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Create a commit that triggers release
git commit --allow-empty -m "fix: trigger release"

# Push to main
git push origin main
```

**This automatically triggers the workflow.**

### Method 4: Using GitHub CLI

Trigger workflow from command line:

```bash
# Install GitHub CLI if needed
# brew install gh (macOS)
# https://cli.github.com/

# Authenticate
gh auth login

# Trigger dry run
gh workflow run release.yml --ref main -f dry_run=true

# Trigger actual release
gh workflow run release.yml --ref main -f dry_run=false

# Check workflow status
gh run list --workflow=release.yml
gh run watch
```

---

## 7. Troubleshooting Common Issues

### Issue 1: "No release published"

**Cause:** No commits since last release match release criteria.

**Solutions:**
1. Create an empty commit with proper type:
   ```bash
   git commit --allow-empty -m "fix: trigger release"
   git push origin main
   ```

2. Check commit history:
   ```bash
   git log --oneline v2.1.8..HEAD
   ```
   Ensure commits use conventional format.

3. Verify last release tag:
   ```bash
   git tag --list --sort=-version:refname | head -5
   ```

### Issue 2: Protected Branch Prevents Push

**Cause:** Branch protection rules prevent semantic-release from pushing.

**Solutions:**
1. **Recommended:** Add semantic-release bot to bypass list:
   - Settings → Branches → Edit `main` protection
   - Under "Restrict who can push to matching branches"
   - Add: `github-actions[bot]`

2. **Alternative:** Temporarily disable protection:
   - Disable "Require status checks"
   - Run release
   - Re-enable protection

3. **Use Personal Access Token (PAT):**
   - Create PAT with `repo` scope
   - Add as `GH_TOKEN` secret
   - Update workflow to use `GH_TOKEN` instead of `GITHUB_TOKEN`

### Issue 3: NPM Authentication Failure

**Symptoms:**
```
npm ERR! code E401
npm ERR! 401 Unauthorized
```

**Solutions:**
1. Verify NPM_TOKEN is valid:
   ```bash
   npm whoami --registry https://registry.npmjs.org/
   ```

2. Generate new token:
   - Visit: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Create "Automation" token
   - Update `NPM_TOKEN` secret in GitHub

3. Check token permissions:
   - Must have "Read and Publish" access
   - Must not be expired

4. Verify package name is available:
   ```bash
   npm view @ibm-cloud/continuous-delivery
   ```

### Issue 4: Build Fails Before Release

**Cause:** TypeScript compilation or tests fail.

**Solutions:**
1. Run build locally:
   ```bash
   npm run build
   npm run test-unit
   ```

2. Fix any errors before pushing

3. Check workflow logs for specific errors

### Issue 5: Git Tag Already Exists

**Cause:** Tag was created but release failed.

**Solutions:**
1. Delete local and remote tag:
   ```bash
   git tag -d v2.1.9
   git push origin :refs/tags/v2.1.9
   ```

2. Re-run release

### Issue 6: Changelog Not Updated

**Cause:** `@semantic-release/git` plugin not committing changes.

**Solutions:**
1. Verify plugin configuration in `.releaserc`:
   ```json
   {
     "prepare": [
       "@semantic-release/changelog",
       "@semantic-release/npm",
       "@semantic-release/git"
     ]
   }
   ```

2. Check git plugin has write permissions

3. Ensure branch protection allows bot commits

### Issue 7: Release Notes Missing Commits

**Cause:** Commits don't follow conventional format.

**Solutions:**
1. Review commit messages:
   ```bash
   git log --oneline v2.1.8..HEAD
   ```

2. Ensure format: `type(scope): description`

3. Valid types: `feat`, `fix`, `perf`, `revert`

4. Rewrite commit messages if needed:
   ```bash
   git rebase -i HEAD~3
   # Change 'pick' to 'reword' for commits to fix
   ```

---

## 8. Creating Empty Commits

Empty commits are useful for forcing releases without code changes.

### Basic Empty Commit

```bash
# PATCH release (0.0.X)
git commit --allow-empty -m "fix: trigger patch release"

# MINOR release (0.X.0)
git commit --allow-empty -m "feat: trigger minor release"

# MAJOR release (X.0.0)
git commit --allow-empty -m "feat!: trigger major release

BREAKING CHANGE: Force major version bump for release"
```

### Empty Commit with Detailed Message

```bash
git commit --allow-empty -m "fix: force release for deployment

This commit forces a new release to deploy recent changes
that were not properly versioned.

Refs: #123"
```

### Empty Commit with Scope

```bash
git commit --allow-empty -m "fix(release): force version bump"
```

### Verify Empty Commit

```bash
# Check commit was created
git log -1 --stat

# Should show:
# commit abc123...
# fix: trigger patch release
# (no files changed)
```

### Push Empty Commit

```bash
# Push to trigger release
git push origin main

# Or push to different branch first
git push origin feature-branch
# Then merge via PR
```

### Best Practices for Empty Commits

1. **Always explain why:**
   ```bash
   git commit --allow-empty -m "fix: force release

   Triggering release to publish recent dependency updates
   that improve security but don't change functionality."
   ```

2. **Use appropriate type:**
   - `fix:` for patch releases (most common)
   - `feat:` for minor releases (new features)
   - `feat!:` or `BREAKING CHANGE:` for major releases

3. **Reference issues:**
   ```bash
   git commit --allow-empty -m "fix: force release for hotfix

   Closes #456"
   ```

4. **Coordinate with team:**
   - Announce before forcing release
   - Document reason in commit message
   - Update team after release completes

---

## 9. Verifying Release Success

After triggering a release, verify it completed successfully:

### Step 1: Check GitHub Actions Workflow

1. Navigate to: `Actions` → `release` workflow
2. Find the latest run
3. Verify all steps completed successfully:
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build
   - ✅ Semantic Release

4. Check logs for:
   ```
   Published release X.Y.Z on default channel
   ```

### Step 2: Verify GitHub Release

1. Navigate to: `Releases` tab
2. Check latest release:
   - ✅ Correct version number (e.g., `v2.1.9`)
   - ✅ Release notes generated
   - ✅ Commits listed
   - ✅ Published timestamp

3. Verify release notes format:
   ```markdown
   ## [2.1.9](https://github.com/IBM/continuous-delivery-node-sdk/compare/v2.1.8...v2.1.9) (2026-06-08)

   ### Bug Fixes

   * trigger patch release ([abc123](commit-link))
   ```

### Step 3: Check Git Tags

```bash
# List recent tags
git fetch --tags
git tag --list --sort=-version:refname | head -5

# Should show new tag:
# v2.1.9
# v2.1.8
# v2.1.7
# ...

# Verify tag points to correct commit
git show v2.1.9

# Check tag is pushed to remote
git ls-remote --tags origin | grep v2.1.9
```

### Step 4: Verify NPM Package

```bash
# Check latest version on npm
npm view @ibm-cloud/continuous-delivery version

# Should show: 2.1.9

# Check all versions
npm view @ibm-cloud/continuous-delivery versions --json

# View package details
npm view @ibm-cloud/continuous-delivery

# Install and test
npm install @ibm-cloud/continuous-delivery@latest
```

**Via npm website:**
1. Visit: https://www.npmjs.com/package/@ibm-cloud/continuous-delivery
2. Verify version number
3. Check publish timestamp
4. Verify package contents

### Step 5: Check CHANGELOG.md

```bash
# View updated changelog
git pull origin main
cat CHANGELOG.md | head -20

# Should show new entry:
## [2.1.9](https://github.com/IBM/continuous-delivery-node-sdk/compare/v2.1.8...v2.1.9) (2026-06-08)

### Bug Fixes

* trigger patch release ([abc123](commit-link))
```

**Verify:**
- ✅ New version section added at top
- ✅ Correct version number
- ✅ Correct date
- ✅ Commits listed under appropriate sections
- ✅ Links to commits and compare view

### Step 6: Verify package.json Version

```bash
# Check version in package.json
git pull origin main
cat package.json | grep '"version"'

# Should show: "version": "2.1.9",
```

### Step 7: Check Commit History

```bash
# View recent commits
git log --oneline -5

# Should show semantic-release commits:
# abc123 chore(release): 2.1.9 [skip ci]
# def456 fix: trigger patch release
# ...
```

### Step 8: Verify Package Integrity

```bash
# Download and inspect package
npm pack @ibm-cloud/continuous-delivery@latest

# Extract and verify contents
tar -xzf ibm-cloud-continuous-delivery-2.1.9.tgz
ls -la package/

# Should contain:
# - dist/ (compiled code)
# - package.json
# - README.md
# - LICENSE
# - CHANGELOG.md
```

### Complete Verification Checklist

- [ ] GitHub Actions workflow completed successfully
- [ ] GitHub Release created with correct version
- [ ] Git tag created and pushed (e.g., `v2.1.9`)
- [ ] NPM package published with correct version
- [ ] CHANGELOG.md updated with new entry
- [ ] package.json version bumped
- [ ] Release commit created by semantic-release
- [ ] Package contents verified
- [ ] Installation test successful

### Rollback if Needed

If release has issues:

```bash
# Unpublish from npm (within 72 hours)
npm unpublish @ibm-cloud/continuous-delivery@2.1.9

# Delete GitHub release
gh release delete v2.1.9

# Delete git tag
git tag -d v2.1.9
git push origin :refs/tags/v2.1.9

# Revert release commit
git revert HEAD
git push origin main
```

---

## Quick Reference Commands

### Force Patch Release
```bash
git commit --allow-empty -m "fix: trigger release"
git push origin main
```

### Force Minor Release
```bash
git commit --allow-empty -m "feat: trigger release"
git push origin main
```

### Force Major Release
```bash
git commit --allow-empty -m "feat!: trigger release

BREAKING CHANGE: Force major version bump"
git push origin main
```

### Dry Run Locally
```bash
npm run semVerDryRun
```

### Manual Workflow Trigger (Dry Run)
```bash
gh workflow run release.yml --ref main -f dry_run=true
```

### Manual Workflow Trigger (Actual)
```bash
gh workflow run release.yml --ref main -f dry_run=false
```

### Check Release Status
```bash
# GitHub Actions
gh run list --workflow=release.yml --limit 5

# NPM
npm view @ibm-cloud/continuous-delivery version

# Git tags
git tag --list --sort=-version:refname | head -5
```

---

## Additional Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Semantic-Release Documentation](https://semantic-release.gitbook.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

## Support

If you encounter issues not covered in this guide:

1. Check [GitHub Issues](https://github.com/IBM/continuous-delivery-node-sdk/issues)
2. Review [semantic-release debugging guide](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting)
3. Ask on [Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud,semantic-release)
4. Contact the maintainers

---

**Last Updated:** 2026-06-08
**Project Version:** 2.1.8
**Semantic-Release Version:** Latest (installed via npx)