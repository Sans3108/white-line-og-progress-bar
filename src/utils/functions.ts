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
export function getParam(V: unknown, D: boolean | number | string, color?: boolean) {
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

export function getQueryData(req: NextApiRequest) {
  const queryParams = new URL(req.url!).searchParams;

  const c = getParam(queryParams.get('c'), 69); // Current time
  const t = getParam(queryParams.get('t'), 420); // Total time

  const w = getParam(queryParams.get('w'), 400); // Width (px)
  const h = getParam(queryParams.get('h'), 40); // Height (px)
  const b = getParam(queryParams.get('b'), 23); // Border radius (px)
  const f = getParam(queryParams.get('f'), 20); // Font size (px)

  const c1 = getParam(queryParams.get('c1'), '000000', true);
  const c2 = getParam(queryParams.get('c2'), '000000', true);
  const c3 = getParam(queryParams.get('c3'), '000000', true);
  const c4 = getParam(queryParams.get('c4'), '000000', true);

  const txt = getParam(queryParams.get('txt'), `undefined`);

  return {
    c,
    t,
    w,
    h,
    b,
    f,
    c1,
    c2,
    c3,
    c4,
    txt
  };
}

export function getQueryMeta(param: number = 1, p: string = 'hi'): { [key: string]: { param: string; type: 'string' | 'number' | 'boolean'; default: string; description: string; isColor: boolean } } {
  return {
    c: {
      param: 'c',
      type: 'number',
      default: '69',
      description: 'Current time (seconds)',
      isColor: false
    },
    t: {
      param: 't',
      type: 'number',
      default: '420',
      description: 'Total time (seconds)',
      isColor: false
    },
    w: {
      param: 'w',
      type: 'number',
      default: '400',
      description: 'Width of the image (px)',
      isColor: false
    },
    h: {
      param: 'h',
      type: 'number',
      default: '40',
      description: 'Height of the image (px)',
      isColor: false
    },
    b: {
      param: 'b',
      type: 'number',
      default: '23',
      description: 'Border radius (px)',
      isColor: false
    },
    f: {
      param: 'f',
      type: 'number',
      default: '20',
      description: 'Font size (px)',
      isColor: false
    },
    c1: {
      param: 'c1',
      type: 'string',
      default: '000000',
      description: '1st gradient color (hex)',
      isColor: true
    },
    c2: {
      param: 'c2',
      type: 'string',
      default: '000000',
      description: '2nd gradient color (hex)',
      isColor: true
    },
    c3: {
      param: 'c3',
      type: 'string',
      default: '000000',
      description: '3rd gradient color (hex)',
      isColor: true
    },
    c4: {
      param: 'c4',
      type: 'string',
      default: '000000',
      description: '4th gradient color (hex)',
      isColor: true
    },
    txt: {
      param: 'txt',
      type: 'string',
      default: 'undefined',
      description: 'Text to display',
      isColor: false
    }
  };
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
