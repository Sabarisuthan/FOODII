import { Product } from '../types';

export function getProductImageUrl(product: Product): string {
  const flavor = (product.flavor || '').toLowerCase();
  const imageKey = (product.image || '').toLowerCase();
  const id = (product.id || '').toLowerCase();

  if (
    flavor.includes('jalapeño') ||
    flavor.includes('jalapeno') ||
    imageKey.includes('jalapeño') ||
    imageKey.includes('jalapeno') ||
    id.includes('jalapeno') ||
    flavor.includes('cheese')
  ) {
    return '/images/cheese-jalapeno.jpeg';
  }

  if (
    flavor.includes('truffle') ||
    imageKey.includes('truffle') ||
    id.includes('truffle')
  ) {
    return '/images/truffle-pepper.jpeg';
  }

  if (
    flavor.includes('peanut') ||
    flavor.includes('butter') ||
    flavor.includes('spread') ||
    imageKey.includes('chocolate-peanut') ||
    imageKey.includes('peanut') ||
    id.includes('choco-pb') ||
    id.includes('peanut')
  ) {
    return '/images/chocolate-peanut-butter.jpeg';
  }

  if (
    flavor.includes('cookie') ||
    flavor.includes('chip') ||
    flavor.includes('biscuit') ||
    imageKey.includes('cookie') ||
    imageKey.includes('double-chocolate') ||
    id.includes('cookie')
  ) {
    return '/images/double-chocolate-cookies.jpeg';
  }

  return '/images/cheese-jalapeno.jpeg';
}
