export function chunk<TData extends unknown>(
  arr: Array<TData>,
  chunkSize: number
): Array<Array<TData>> {
  if (chunkSize <= 0) throw "Invalid chunk size";
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}
