const correctImagePath = (imageUrl: string): string => {
  if (typeof imageUrl === 'undefined') {
    return '/images/inf.jpg';
  }
  if (imageUrl.includes(']')) {
    return imageUrl.replace(']', '');
  }
  if (imageUrl.includes('[')) {
    return imageUrl.replace('[', '');
  }
  return imageUrl;
};

export default correctImagePath;
