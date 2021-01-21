# Pull Request Review Approval Tracker

This action will label open PRs with the count of approved reviews for quick referencing.

# Usage

```yaml
name: "review-tracker"
on: pull_request_review
jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: hcancelik/pr-approval-tracker@v1
        with:
          secret_token: ${{ secrets.GITHUB_TOKEN }}
```

Test
