# Pull Request Review Approval Tracker

This action will label open PRs with the count of approved reviews for quick referencing.

# Usage

```yaml
on:
  push:
    branches:
      - master
jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: hcancelik/pr-approval-tracker
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```
