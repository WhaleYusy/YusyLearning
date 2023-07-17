const routes:any = []

const modules:any = import.meta.glob('./modules/*.ts', {
  eager: true,
})

for (const fileName in modules) {
  for (const param in modules[fileName]) {
    routes.push(...modules[fileName][param])
  }
}

export default routes