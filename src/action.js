const api = require("./api");
const helper = require("./helper");

module.exports = {
  run: async (token, owner, repo) => {
    const pullRequests = await api.getOpenPullRequests(token, owner, repo);

    for await (const pullRequest of pullRequests) {
      const reviews = await api.getPullRequestReviews(token, owner, repo, pullRequest.number);

      const approvedReviewsCount = reviews.filter((review) => review.state === "APPROVED").length;

      const desiredLabel = helper.getDesiredLabel(approvedReviewsCount);

      const newLabels = helper.getUpdatedLabels(pullRequest, desiredLabel);

      if (newLabels !== null) {
        await api.setPullRequestLabels(token, owner, repo, pullRequest.number, newLabels);
      }
    }
  }
};
