module.exports = {
  getDesiredLabel: (numOfApprovedReviews) => {
    if (numOfApprovedReviews === 0) {
      return null;
    } else {
      return `Approved +${numOfApprovedReviews}`;
    }
  },
  getUpdatedLabels: (pullRequest, newLabel) => {
    // First check if there is any need for change
    if (pullRequest.labels.filter((label) => label.name === newLabel).length > 0) {
      if (pullRequest.labels.filter((l) => l.name.startsWith("Approved +")).length === 1) {
        return null;
      }
    }

    // Get existing labels except action ones and add the desired label
    const existingLabels = pullRequest.labels
      .filter((l) => !l.name.startsWith("Approved +"))
      .map((l) => l.name);

    if (newLabel) {
      existingLabels.push(newLabel);
    }

    return existingLabels;
  }
};
