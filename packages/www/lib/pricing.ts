import fs from 'fs';
import YAML from 'yaml';
import path from 'path';
import Pricing from '../pages/pricing';

export interface Pricing {
  headline: String[];
  description: String[];
  pricing: {
    level: String;
    descritpion: String;
    price: String;
    limit: String;
  }[];
}

export function getPricing(): Pricing {
  try {
    const fp = path.resolve('./content/pricing.yml');
    const yml = fs.readFileSync(fp).toString();
    const pricings = <Pricing>YAML.parse(yml);
    return pricings;
  } catch {
    throw new Error('Failed reading pricing.yml');
  }
}
