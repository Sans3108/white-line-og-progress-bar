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
