const api = require("./api");
const helper = require("./helper");

class Action {
  constructor (token, owner, repo) {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
  }

  async run (pr = null) {
    if (pr) {
      await this.checkPR(pr);
    } else {
      await this.checkAllPRs();
    }
  }

  async checkPR (pr) {
    const reviews = await api.getPullRequestReviews(this.token, this.owner, this.repo, pr.number);

    await this.updateLabels(pr, reviews);
  }

  async checkAllPRs () {
    const pullRequests = await api.getOpenPullRequests(this.token, this.owner, this.repo);

    for await (const pullRequest of pullRequests) {
      const reviews = await api.getPullRequestReviews(this.token, this.owner, this.repo, pullRequest.number);

      await this.updateLabels(pullRequest, reviews);
    }
  }

  async updateLabels (pullRequest, reviews) {
    const approvedReviewsCount = reviews.filter((review) => review.state === "APPROVED").length;

    const desiredLabel = helper.getDesiredLabel(approvedReviewsCount);

    const newLabels = helper.getUpdatedLabels(pullRequest, desiredLabel);

    if (newLabels !== null) {
      await api.setPullRequestLabels(this.token, this.owner, this.repo, pullRequest.number, newLabels);
    }
  }
}

module.exports = Action;
