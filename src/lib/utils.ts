export function fakeApiCall<T>(data: T, delay: number = 500): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(data);
    }, delay);
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}
