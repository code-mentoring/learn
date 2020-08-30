import fs from 'fs';
import YAML from 'yaml';
import path from 'path';
import Languages from '../components/languages';

export interface Icon {
  headline: String;
  name: String[];
}

export function getIcon() {
  try {
    const ic = path.resolve('./content/icon.yml');
    const yml = fs.readFileSync(ic).toString();
    const icons = <Languages>YAML.parse(yml);
    return icons;
  } catch (error) {
    throw new Error('Could not read icons.yml');
  }
}
