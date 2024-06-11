export const isFullfilled = <T>(
  value: PromiseSettledResult<T>
): value is PromiseFulfilledResult<T> => {
  return value.status === "fulfilled";
};

export const isRejected = <T>(
  value: PromiseSettledResult<T>
): value is PromiseRejectedResult => {
  return value.status === "rejected";
};
