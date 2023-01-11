const jsonData: Record<string, Record<string, Array<any>>> = import.meta.glob(
  "./jsonData/*.json",
  {
    eager: true,
  }
);
const data: Record<string, any> = {};
for (const [key, value] of Object.entries(jsonData)) {
  const newKey = key.split("jsonData/")[1].split(".json")[0];
  data[newKey] = value.default.sort((a, b) => {
    return a.kda < b.kda ? 1 : -1;
  });
}
export default data;
