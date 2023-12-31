import moment from "moment";

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

export const isEqualObjects = (object1, object2, keyException) => {
  const props1 = Object.getOwnPropertyNames(object1);

  for (let i = 0; i < props1.length; i += 1) {
    const propKey = props1[i];

    if (object1[propKey] !== object2[propKey] && keyException !== propKey) {
      return false;
    }
  }

  return true;
};

export const countPriceItem = (obj) => obj.countItem * obj.price;

export const getTotalPrice = (arr, count) =>
  arr.reduce((sum, obj) => (sum = obj.price * count), 0);

export const getTotalCount = (takeObject) => {
  return takeObject.reduce((sum, obj) => {
    return obj.countItem ? obj.countItem + sum : sum;
  }, 0);
};

export const formatDate = (dateString, format = "MMMM D, YYYY") => {
  const originalDate = new Date(dateString);
  return moment(originalDate).format(format);
};
export const createCategoriesOptions = (categories) => {
  return (categories || []).map((cat) => ({
    value: String(cat.id),
    label: capitalizeWord(cat.name),
  }));
};

export function isArrayOfFile(files) {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}

export async function createImageObjectFromURL(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const imageObject = {
    errors: undefined,
    file: new File([blob], "image.jpg", {
      lastModified: Date.now(),
      type: "image/jpeg",
    }),
    id: Date.now(),
    name: "image.jpg",
    size: blob.size,
    type: "image/jpeg",
    valid: true,
  };

  return imageObject;
}
