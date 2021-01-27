import {
  englishNumbers,
  persianNumbers,
  arabicNumbers,
  englishNumbersFinder,
  persianNumbersFinder,
  arabicNumbersFinder,
} from 'constants/constants'

export const toEnDigit = value => {
  let result = value
  for (let i = 0; i < 10; i += 1) {
    result = result
      .toString()
      .replace(persianNumbersFinder[i], englishNumbers[i])
      .replace(arabicNumbersFinder[i], englishNumbers[i])
  }
  return result
}

export const toFaDigit = value => {
  let result = value
  for (let i = 0; i < 10; i += 1) {
    result = result
      .toString()
      .replace(englishNumbersFinder[i], persianNumbers[i])
      .replace(arabicNumbersFinder[i], persianNumbers[i])
  }
  return result
}

export const toArDigit = value => {
  let result = value
  for (let i = 0; i < 10; i += 1) {
    result = result
      .toString()
      .replace(englishNumbersFinder[i], arabicNumbers[i])
      .replace(persianNumbersFinder[i], arabicNumbers[i])
  }
  return result
}

export const getCompanyTier = () => {
  return [
    { value: '1', title: 'سطح ۱' },
    { value: '2', title: 'سطح ۲' },
    { value: '3', title: 'سطح ۳' },
  ]
}

export const getSponsorsTier = () => {
  return [
    { value: '', title: 'هیچکدام' },
    { value: 'diamond', title: 'الماس' },
    { value: 'bronze', title: 'برنز' },
    { value: 'silver', title: 'نقره‌ای' },
    { value: 'gold', title: 'طلایی' },
    { value: 'platinium', title: 'پلاتین' },
  ]
}
