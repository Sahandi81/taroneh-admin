export default function getPrice(price) {
  return Number(price.toString().trim().replaceAll(',', ''));
}