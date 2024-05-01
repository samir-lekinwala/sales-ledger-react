// function countPresents(prod, presents) {
//   let totalProductivity =
//     Object.values(prod).reduce(
//       (accumulator, currentValue) => accumulator + currentValue,
//       0,
//     ) * 1440

import { set } from 'firebase/database'

//   function calculateTime(time) {
//     const [h, m, s] = time.split(':')
//     return Number(h) * 60 + Number(m) + Number(s) / 60
//   }

//   const time = presents
//     .map((present) => {
//       return calculateTime(present)
//     })
//     .sort((a, b) => {
//       return a - b
//     })

//   let presentsDelivered = 0
//   for (let i = 0; i < time.length; i++) {
//     if (totalProductivity > time[i]) {
//       totalProductivity = totalProductivity -= time[i]
//       presentsDelivered++
//     } else break
//   }
//   return presentsDelivered
// }

// // var dict = { Santa: 1, elf_1: 1, elf_2: 2 } //4 * 24 hours of productivity
// // var pres = [
// //   '01:00:00',
// //   '06:00:00',
// //   '12:00:00',
// //   '18:00:00',
// //   '24:00:00',
// //   '36:00:00',
// // ]
// // var dict = { Santa: 2, elf_0: 2 } //4 * 24 hours of productivity
// var dict = { Santa: 2, elf_0: 2, elf_1: 4, elf_2: 3, elf_3: 1, elf_4: 1 } //4 * 24 hours of productivity
// var pres = [
//   '14:54:41',
//   '10:52:50',
//   '04:18:16',
//   '20:07:07',
//   '06:20:15',
//   '05:19:02',
//   '21:04:00',
//   '16:05:14',
//   '22:12:27',
//   '21:47:29',
//   '05:44:43',
//   '11:07:56',
//   '17:54:27',
//   '16:53:24',
//   '15:27:08',
//   '07:44:28',
//   '20:03:15',
//   '04:28:14',
//   '13:15:54',
//   '20:14:54',
//   '19:53:05',
// ]
// //pres[0] + pres[1] + pres[2] + pres[3] + pres[4] + pres[5] = 97 hours
// // console.log(countPresents(dict, pres)) //, 5);

// console.log(countPresents(dict, pres))
// let incrementString = (str) =>
// str.replace(/([0-8]|\d?9+)?$/, (e) => (console.log('e', e), e ? +e + 1 : 1))
// function incrementString(strng) {

//   const splitString = strng.split('')
//   const letterIndex = splitString.filter((letter) =>
//     /a-zA-Z/.test(letter),
//   )

//   const lastIndexOfLetter =
//     strng.lastIndexOf(letterIndex[letterIndex.length - 1]) + 1

//   const numbers = splitString.splice(lastIndexOfLetter)

//   const addingOne = Number(numbers.join('')) + 1

//   const joinedNumbers = addingOne.toString().padStart(numbers.length, 0)

//   return splitString.splice(0, lastIndexOfLetter).join('') + joinedNumbers
// }

// console.log(incrementString('foobar000')) //, "foobar001");
// console.log(incrementString('foobar999')) //, "foobar1000");
// console.log(incrementString('foobar00999')) //, "foobar01000");
// console.log(incrementString('foo')) //, "foo1");
// console.log(incrementString('foobar001')) //, "foobar002");
// console.log(incrementString('foobar1')) //, "foobar2");
// console.log(incrementString('1')) //, "2";
// console.log(incrementString('009')) //, "010");
// console.log(incrementString('fo99obar99')) //, "fo99obar100")

// <------- Work in progress -------->
// function balanced(centrifuge) {
//   //get count of distance between 1 and 0
//   //half the array and see if the two sides are matching

//   const firstHalf = centrifuge.slice(0, centrifuge.length / 2).join('')
//   const secondHalf = centrifuge.slice(centrifuge.length / 2).join('')

//   console.log('first half', firstHalf)
//   console.log('second half', secondHalf)

//   return firstHalf == secondHalf ? true : false
// }

// console.log(balanced([0, 0, 1])) //, false],
// console.log(balanced([0, 0, 1, 0, 0, 0])) //, false],
// console.log(balanced([0, 1, 0, 0, 1, 0])) //, true],
// console.log(balanced([0, 0, 1, 1, 0, 0])) //, false],
// // console.log(balanced[, 0, 1, 0, 1, 0]) //, true],
// // console.log(balanced[, 1, 1, 0, 0, 0]) //, false],
// // console.log(balanced[, 1, 0, 1, 1, 1, 0, 1, 1, 0]) //, false],
// // console.log(balanced[, 1, 1, 0, 0, 1, 1, 1, 1, 1]) //, false],
// // console.log(balanced[, 1, 1, 1, 0, 1, 1, 1, 1, 0]) //, true],
// console.log(balanced([1, 1, 1, 0, 1, 1, 1, 1, 1, 1])) //, false],
// console.log(balanced([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])) //, true],

// [1,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,0,0]

// <------- Work in progress -------->

// function countStudents(students, sandwiches) {
//   let studentsArray = students
//   let sandwichesArray = sandwiches

//   for (let i = 0; i < students.length * sandwiches.length; i++) {
//     if (studentsArray[0] === sandwichesArray[0]) {
//       studentsArray = studentsArray.slice(1)
//       sandwichesArray = sandwichesArray.slice(1)
//     } else if (studentsArray[0] !== sandwichesArray[0]) {
//       studentsArray.push(studentsArray.shift())
//     }
//   }
//   return studentsArray.length
// }

// const students = [1, 1, 0, 0]
// // const students = [1, 1, 1, 0, 0, 1]

// const sandwiches = [0, 1, 0, 1]
// // const sandwiches = [1, 0, 0, 0, 1, 1]

// console.log(countStudents(students, sandwiches))

// <------- Work in progress -------->

// var timeRequiredToBuy = function (tickets, k) {
//   const totalTicketsInLine = tickets.reduce((acc, number) => (acc += number), 0)

//   let filteredBelowTicketNumber = tickets.filter(
//     (ticket) => ticket < tickets[k],
//   )

//   let sumOfOtherTickets = filteredBelowTicketNumber.reduce(
//     (acc, number) => (acc += number),
//     0,
//   )
//   console.log(sumOfOtherTickets)

//   let mappedArray = tickets

//   let result = 0

//   for (let i = 0; i < totalTicketsInLine; i++) {
//     if (mappedArray[k] !== 0) {
//       mappedArray = mappedArray.map((number) => (number = --number))
//       i++
//       result = i

//     }
//   }

//   return result
// }

// console.log(timeRequiredToBuy([2, 3, 2], 2)) //6
// console.log(timeRequiredToBuy([5, 1, 1, 1], 0)) // 8

// <------- Work in progress -------->

// let nums1 = [1, 2, 3, 0, 0, 0],
//   m = 3,
//   nums2 = [2, 5, 6],
//   n = 3
// var merge = function (nums1, m, nums2, n) {
//   let sortedCombinedArray = [...nums1.slice(0, m), ...nums2.slice(0, n)].sort(
//     (a, b) => {
//       return a - b
//     },
//   )
//   nums1.length = 0
//   nums1.splice(0, 0, ...sortedCombinedArray)
// }
// console.log(merge(nums1, m, nums2, n))
// console.log(nums1)
// // console.log(nums1)
// let nums1 = [1, 2, 3, 0, 0, 0],
// val = 0

// var removeElement = function (nums, val) {

//   nums.splice(0, nums.length, ...nums1.filter((number) => number != val))
// }

// console.log(removeElement(nums1, val))
// console.log(nums1)
// let nums = [2, 2, 1, 1, 1, 2, 2]

// var removeDuplicates = function (nums) {
//   nums.splice(0, nums.length, ...new Set(nums))
// }

// var removeDuplicates = function (nums) {
//   let countObj = {}

//   nums.forEach((number) => {
//     countObj[number] = ++countObj[number] || 1
//   })

//   const setArray = Array.from(new Set(nums))

//   let newArray = []
//   nums.length = 0

//   for (let i = 0; i < setArray.length; i++) {
//     if (countObj[setArray[i]] > 1) {
//       newArray.push(setArray[i], setArray[i])
//     } else {
//       newArray.push(setArray[i])
//     }
//   }
//   nums.push(...newArray)
// }
// console.log(removeDuplicates(nums))
// console.log(nums)
// let nums = [2, 2, 1, 1, 1, 2, 2]
// let nums = [3, 3, 4]
let nums = [3, 2, 3]

var majorityElement = function (nums) {
  const countObj = {}

  nums.forEach((number) => {
    countObj[number] = ++countObj[number] || 1
  })
  console.log(countObj)

  let result = 0

  for (const key in countObj) {
    const starter = countObj[key]
    if (countObj[key] > starter) {
      result = key
    } else result = starter
  }

  return result
}

// const val = Object.keys(countObj)
// console.log(countObj)

// console.log(Math.max(...Object.values(countObj)))

console.log(majorityElement(nums))
