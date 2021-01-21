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
    let approvedReviews = new Set();

    reviews.forEach((review) => {
      const status = review.state.toLowerCase();
      const user = review.user.login;

      if (status === "approved") {
        approvedReviews.add(user);
      } else if (status === "dismissed") {
        const count = reviews.filter((r) => {
          return r.user.login === user &&
            r.state.toLowerCase() === "approved" &&
            r.submitted_at > review.submitted_at;
        }).length;

        if (count === 0) {
          approvedReviews.delete(user);
        }
      }
    });

    const desiredLabel = helper.getDesiredLabel(approvedReviews.size);

    const labelToRemove = helper.existingLabelNeedsToBeRemoved(pullRequest, desiredLabel);

    if (labelToRemove) {
      await api.removeLabelFromPullRequest(this.token, this.owner, this.repo, pullRequest.number, desiredLabel);
    }

    if (desiredLabel && helper.newLabelNeeded(pullRequest, desiredLabel)) {
      await api.addLabelToPullRequest(this.token, this.owner, this.repo, pullRequest.number, desiredLabel);
    }
  }
}

module.exports = Action;
