const api = require("./api");
const helper = require("./helper");

module.exports = {
  run: async (token, owner, repo, pr = null) => {
    if (pr) {
      await module.exports.checkPR(token, owner, repor, pr);
    } else {
      await module.exports.checkAllPRs(token, owner, repo);
    }
  },
  checkPR: async(token, owner, repo, pr) => {
    const pullRequest = await api.getPullRequest(pr);

    const reviews = await api.getPullRequestReviews(token, owner, repo, pr);

    await module.exports.checkLabels(token, owner, repo, pullRequest, reviews);
  },
  checkAllPRs: async (token, owner, repo) => {
    const pullRequests = await api.getOpenPullRequests(token, owner, repo);

    for await (const pullRequest of pullRequests) {
      const reviews = await api.getPullRequestReviews(token, owner, repo, pullRequest.number);

      await module.exports.checkLabels(token, owner, repo, pullRequest, reviews);
    }
  },
  checkLabels: async(token, owner, repo, pullRequest, reviews) => {
    const approvedReviewsCount = reviews.filter((review) => review.state === "APPROVED").length;

    const desiredLabel = helper.getDesiredLabel(approvedReviewsCount);

    const newLabels = helper.getUpdatedLabels(pullRequest, desiredLabel);

    if (newLabels !== null) {
      await api.setPullRequestLabels(token, owner, repo, pullRequest.number, newLabels);
    }
  }
};
