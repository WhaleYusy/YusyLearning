export interface PersonInter {
  id: string,
  name: string,
  age: number,
  sex?: boolean
}

// export type Persons = Array<PersonInter> 
export type Persons = PersonInter[] 