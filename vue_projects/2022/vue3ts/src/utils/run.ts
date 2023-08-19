export default function add(a: number, ...b: number[]) {
  let sum = a;
  if (b.length > 0) {
    for (const i of b) {
      sum += i;
    }
  }
  console.log(sum);
}
