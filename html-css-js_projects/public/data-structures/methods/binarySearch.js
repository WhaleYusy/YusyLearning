function binarySearch(arr, value, low, high) {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = arr[mid]
    if(element < value){
      return binarySearch(arr, value, mid + 1, high)
    }else if(element > value){
      return binarySearch(arr, value, low, mid - 1)
    }else{
      return mid
    }
  }
  return undefined
}

const arr = [11,32,53,74,105,146,177,218,289,410]
console.log(binarySearch(arr, 410, 0, arr.length - 1));