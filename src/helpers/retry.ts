export const retryAction = async <TReturn>(
  callback: () => TReturn,
  retry = 3
): Promise<TReturn> => {
  let attempts = 0;

  while (attempts < retry) {
    try {
      return await callback();
    } catch (error) {
      attempts++;
    }
  }

  return Promise.reject("Failed to retry function");
};
