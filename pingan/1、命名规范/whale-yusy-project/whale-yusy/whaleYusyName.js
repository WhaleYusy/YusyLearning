var familyName = 'Xiaojing Yu';
let isYoung = true;
function getMoney() {
    return 'get money'
}
const FAMILY = ['Shengyu Yu', 'Yuxia Huang', 'Xiaojing Yu', 'Xiaoli Yu']
class Person {
    constructor(name){
        this.name = name
        this.age = 18
    }
    #sex = true
    #changeSex(){
        this.#sex = false
    }
    getSex(){
        this.#changeSex()
        return this.#sex
    }
}