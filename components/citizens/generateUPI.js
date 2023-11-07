const Schema = require('./schema')

class GenerateUPI {
  async generate () {
    const random = String(Math.floor(Math.random() * 10000000000000000000) + 1)
    const randomNumber = String('00000000' + random).slice(-19)
    const firstCheckSum = await new GenerateUPI().compute(randomNumber)
    const checkSumRandomNumber = String(randomNumber) + String(firstCheckSum)
    const secondCheckSum = await new GenerateUPI().compute(checkSumRandomNumber)
    const checkSumDigit = String(firstCheckSum) + String(secondCheckSum)
    const firstChar = String(randomNumber.charAt(0))
    const startsWith = ['0', '6', '7', '8', '9']
    let upi = ''
    if (startsWith.indexOf(firstChar) >= 0) {
      upi = randomNumber + checkSumDigit
    } else {
      const tailString = String(randomNumber.slice(1))
      upi = firstChar + checkSumDigit + tailString
    }
    var getRandom = (length) => {
      return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1))
    }
    const randomDigits = String(getRandom(4));
    const date = new Date();
    const day = (date.getDate() < 10 ? ('0'+(date.getDate())) : date.getDate());
    const month = (date.getMonth()+1 < 10 ? ('0'+(date.getMonth()+1)) : date.getMonth()+1);
    const year = date.getFullYear().toString().slice(-2);
    const datePattern = year + month + day;
    return datePattern + '-' + randomDigits;
  }

  async generateUPI () {
    const upi = await new GenerateUPI().generate()
    const count = await Schema.find().where({ documentNumber: upi }).countDocuments().lean().exec()
    if (count === 0) {
      return upi
    } else {
      return await new GenerateUPI().generateUPI()
    }
  }

  async compute (num) {
    const ds = String(num).replace(/[^0-9]/g, '')
    const lookup = {
      0: 0,
      1: 2,
      2: 4,
      3: 6,
      4: 8,
      5: 1,
      6: 3,
      7: 5,
      8: 7,
      9: 9
    }

    let sum = 0
    let odd = 1
    for (let i = ds.length - 1; i > -1; i -= 1) {
      sum += odd ? lookup[ds[i]] : Number(ds[i])
      odd ^= 1
    }
    if ((sum % 10) === 0) { return String(0) } else { return String(10 - (sum % 10)) }
  }

  async validate (num) {
    if (num.length !== 10) {
      return false
    }
    const firstChar = String(num.charAt(0))
    const startsWith = ['0', '6', '7', '8', '9']
    let upi = String(num)
    if (startsWith.indexOf(firstChar) === -1) {
      const checkSumDigit = num.substring(1, 3)
      const tailString = num.substring(3, num.length)
      upi = String(firstChar + tailString + checkSumDigit)
    }
    const firstValidate = await new GenerateUPI().checkSumValidate(upi)
    if (firstValidate) {
      const secondCheck = upi.substring(0, 9)
      const secondValidate = await new GenerateUPI().checkSumValidate(secondCheck)
      return !!secondValidate
    } else {
      return false
    }
  }

  async checkSumValidate (num) {
    const tailDigit = num.slice(-1)
    const headDigit = num.substring(0, (num.length - 1))
    const checkSum = await new GenerateUPI().compute(headDigit)
    return checkSum === tailDigit
  }
}

module.exports = GenerateUPI
