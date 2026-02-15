const getTopContributors = (contributions, totalAmount) => {
  const threshold = totalAmount * 0.05; // 5% of total

  return contributions
    .filter((contribution) => contribution.amount > threshold)
    .sort((a, b) => b.amount - a.amount); // Sort by amount descending
};
