const jsonData = import.meta.glob("./jsonData/*.json", { eager: true });
const data: Record<string, any> = {};
for (const [key, value] of Object.entries(jsonData)) {
  const newKey = key.split("jsonData/")[1].split(".json")[0];
  data[newKey] = value.default;
}
export default data;
