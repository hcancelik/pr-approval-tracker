module.exports = {
  getDesiredLabel: (numOfApprovedReviews) => {
    if (numOfApprovedReviews === 0) {
      return null;
    } else {
      return `Approved +${numOfApprovedReviews}`;
    }
  },
  existingLabelNeedsToBeRemoved: (pullRequest, newLabel) => {
    const existingLabels = pullRequest.labels
      .filter((l) => l.name.startsWith("Approved +") && l.name !== newLabel)
      .map((l) => l.name);

    if (existingLabels.length > 0) {
      return existingLabels[0];
    }

    return false;
  },
  newLabelNeeded: (pullRequest, newLabel) => {
    // if new label already exists
    if (pullRequest.labels.filter((label) => label.name === newLabel).length > 0) {
      // if there are no other action labels(they should start with Approved +)
      if (pullRequest.labels.filter((l) => l.name.startsWith("Approved +")).length === 1) {
        // no action needed;
        return false;
      }
    }

    return true;
  },
};
