export default function thousandSeparator(price) {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '');

  return addCommas(removeNonNumeric(price));
}
