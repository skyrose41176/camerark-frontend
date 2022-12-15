export const getAPIBaseUrl = () => {
  const port3000 = window.location?.port === '3000';
  if (port3000) {
    return `https://localhost:5001${process.env.PUBLIC_URL || '/resolve-problem'}/api/v1`;
  }
  return `${process.env.PUBLIC_URL || '/resolve-problem'}/api/v1`;
};
