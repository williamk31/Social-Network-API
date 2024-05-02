function formattedDate(today) {
   return `${today.getMonth()}/${today.getDate()}/${today.getFullYear()} at ${today.getHours()}:${today.getMinutes()}`
}

module.exports = formattedDate;