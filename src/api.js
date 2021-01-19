const core = require("@actions/core");
const github = require("@actions/github");

module.exports = {
  getOpenPullRequests: async (token, owner, repo) => {
    const octokit = github.getOctokit(token);

    let pullRequests = [];
    let page = 0;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const { data: prs } = await octokit.pulls.list({
          owner,
          repo,
          state: "open",
          per_page: 100,
          page
        });

        prs.forEach((pr) => pullRequests.push(pr));

        page += 1;
        hasNextPage = prs.length === 100;
      } catch (error) {
        hasNextPage = false;
        core.setFailed(`Get open pull request call failed: ${error}`);
      }
    }

    core.info(`Number of Open PRs: ${pullRequests.length}`);

    return pullRequests;
  },
  getPullRequestReviews: async (token, owner, repo, id) => {
    const octokit = github.getOctokit(token);

    let reviews = [];
    let page = 0;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const { data:rvs } = await octokit.pulls.listReviews({
          owner,
          repo,
          pull_number: id,
          per_page: 100,
          page
        });

        rvs.forEach((rv) => reviews.push(rv));

        page += 1;
        hasNextPage = rvs.length === 100;
      } catch (error) {
        hasNextPage = false;
        core.setFailed(`Get pull request reviews call failed: ${error}`);
      }
    }

    return reviews;
  },
  setPullRequestLabels: async(token, owner, repo, id, labels) => {
    const octokit = github.getOctokit(token);

    try {
      await octokit.issues.setLabels({
        owner,
        repo,
        issue_number: id,
        labels
      });

      return true;
    } catch (error) {
      core.setFailed(`Create label request call failed: ${error}`);

      return false;
    }
  }
};
