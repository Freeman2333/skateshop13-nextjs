export const createQueryString = (searchParams, params) => {
  const newSearchParams = new URLSearchParams(searchParams?.toString());

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(value));
    }
  }

  return newSearchParams.toString();
};

export const capitalizeWord = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);
