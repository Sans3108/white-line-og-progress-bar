import { NextApiRequest } from 'next';

export function isHexColor(str: string): boolean {
  if (str.length !== 6) return false;

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (
      !(
        (
          (charCode >= 48 && charCode <= 57) || // 0-9
          (charCode >= 65 && charCode <= 70) || // A-F
          (charCode >= 97 && charCode <= 102)
        ) // a-f
      )
    )
      return false;
  }

  return true;
}

export function getParam(V: unknown, D: number, color?: boolean): number;
export function getParam(V: unknown, D: boolean, color?: boolean): boolean;
export function getParam(V: unknown, D: string, color?: boolean): string;
export function getParam(V: unknown, D: number | boolean | string, color?: boolean) {
  if (!V) return D;

  if (typeof D === 'boolean') {
    if (V === 'true') {
      return true;
    } else if (V === 'false') {
      return false;
    } else return D;
  }

  if (typeof D === 'string' && color) {
    if (String(V).length === 6 && isHexColor(String(V))) {
      return String(V);
    } else return D;
  } else if (typeof D === 'string') {
    if (String(V).length > 0) return String(V);
    return D;
  }

  if (isNaN(Number(V)) || Number(V) < 0) {
    return D;
  } else return Number(V);
}

export interface Param {
  name: string;
  valueType: 'string' | 'number' | 'boolean';
  defaultValue: string;
  description: string;
  isColor: boolean;
}

export function queryParamList(): Param[] {
  return [
    {
      name: 'c',
      valueType: 'number',
      defaultValue: '69',
      description: 'Current time (seconds)',
      isColor: false
    },
    {
      name: 't',
      valueType: 'number',
      defaultValue: '420',
      description: 'Total time (seconds)',
      isColor: false
    },
    {
      name: 'w',
      valueType: 'number',
      defaultValue: '400',
      description: 'Width of the image (px)',
      isColor: false
    },
    {
      name: 'h',
      valueType: 'number',
      defaultValue: '40',
      description: 'Height of the image (px)',
      isColor: false
    },
    {
      name: 'b',
      valueType: 'number',
      defaultValue: '23',
      description: 'Border radius (px)',
      isColor: false
    },
    {
      name: 'f',
      valueType: 'number',
      defaultValue: '20',
      description: 'Font size (px)',
      isColor: false
    },
    {
      name: 'c1',
      valueType: 'string',
      defaultValue: '000000',
      description: '1st gradient color (hex)',
      isColor: true
    },
    {
      name: 'c2',
      valueType: 'string',
      defaultValue: '000000',
      description: '2nd gradient color (hex)',
      isColor: true
    },
    {
      name: 'c3',
      valueType: 'string',
      defaultValue: '000000',
      description: '3rd gradient color (hex)',
      isColor: true
    },
    {
      name: 'c4',
      valueType: 'string',
      defaultValue: '000000',
      description: '4th gradient color (hex)',
      isColor: true
    },
    {
      name: 'txt',
      valueType: 'string',
      defaultValue: 'undefined',
      description: 'Text to display',
      isColor: false
    }
  ];
}

export interface StringParam {
  name: string;
  value: string;
}

export interface BooleanParam {
  name: string;
  value: boolean;
}

export interface NumberParam {
  name: string;
  value: number;
}

export type ParamType = StringParam | NumberParam | BooleanParam;

export function getQueryData(req: NextApiRequest) {
  const paramList = queryParamList();

  const queryParams = new URL(req.url!).searchParams;

  const params: ParamType[] = [];

  for (const p of paramList) {
    if (p.valueType === 'string') {
      params.push({
        name: p.name,
        value: getParam(queryParams.get(p.name), String(p.defaultValue), p.isColor)
      });
    } else if (p.valueType === 'boolean') {
      params.push({
        name: p.name,
        value: getParam(queryParams.get(p.name), p.defaultValue.toLowerCase() === 'true' ? true : false, p.isColor)
      });
    } else {
      params.push({
        name: p.name,
        value: getParam(queryParams.get(p.name), Number(p.defaultValue) || 0, p.isColor)
      });
    }
  }

  return params;
}

// https://stackoverflow.com/a/35970186
export function padZero(str: string | number, len?: number) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

// https://stackoverflow.com/a/35970186
export function invertColor(hex: string, bw: boolean) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r: string | number = parseInt(hex.slice(0, 2), 16);
  let g: string | number = parseInt(hex.slice(2, 4), 16);
  let b: string | number = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}
