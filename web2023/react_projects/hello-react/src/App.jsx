import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import axios from 'axios'

export default class App extends Component {
  getStudentData = () => {
    axios.get('/api1/students').then(res => {
      console.log(res.data);
    },
    err => {
      console.log(err);
    })
    axios.get('/api2/cars').then(res => {
      console.log(res.data);
    },
    err => {
      console.log(err);
    })
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <h2>nanoid: {nanoid()}</h2>
        <button onClick={this.getStudentData}>点我获取学生数据</button>
      </div>
    )
  }
}
