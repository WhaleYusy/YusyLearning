// 百钱买百鸡问题

// 描述
// 公元五世纪，我国古代数学家张丘建在《算经》一书中提出了“百鸡问题”：鸡翁一值钱五，鸡母一值钱三，鸡雏三值钱一。百钱买百鸡，问鸡翁、鸡母、鸡雏各几何？
// 现要求你打印出所有花一百元买一百只鸡的方式。
// 输入描述：
// 输入任何一个整数，即可运行程序。

// 输出描述：
//  输出有数行，每行三个整数，分别代表鸡翁，母鸡，鸡雏的数量

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var trulyLine = 1
rl.on('line', (line) => {
  tokens.push(line)
  if (countLine === trulyLine) {
    // 请输入你的方法
    // for (let x = 0; x <= 20; x++) {
    //   let x1 = x * 5;
    //   for (let y = 0; y <= 33; y++) {
    //     let y1 = y * 3
    //     for (let z = 0; z <= 300; z++) {
    //       let z1 = z / 3, xyz = x + y + z, xyz1 = x1 + y1 + z1;
    //       if (xyz === xyz1 && xyz === 100) {
    //         console.log(`${x} ${y} ${z}`)
    //       }
    //     }
    //   }
    // }
    for (let x = 0; x <= 20; x++) {
      let x1 = x * 5;
      for (let y = 0; y <= (100 - x1) / 3; y++) {
        let y1 = y * 3
        for (let z = 0; z <= (100 - x1 - y1) * 3; z++) {
          let z1 = z / 3, xyz = x + y + z, xyz1 = x1 + y1 + z1;
          if (xyz === xyz1 && xyz === 100) {
            console.log(`${x} ${y} ${z}`)
          }
        }
      }
    }
  } else {
    countLine++
  }
})

// 0 25 75
// 4 18 78
// 8 11 81
// 12 4 84