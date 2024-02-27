const buildUrl = (url: string, params: { category: string }) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? '?' : '&';
    urlWithParams += `${sign}${key}=${value}`;
  });

  console.log(urlWithParams);

  return urlWithParams;
};

export default buildUrl;
