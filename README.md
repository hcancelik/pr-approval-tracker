# Pull Request Review Approval Tracker

// TODO:: Write a brief description

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
