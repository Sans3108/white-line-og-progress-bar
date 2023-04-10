import type { NextApiRequest } from 'next';
import { ImageResponse } from '@vercel/og';

function isHexColor(str: string): boolean {
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

function getParam(V: unknown, D: number, color?: boolean): number;
function getParam(V: unknown, D: boolean, color?: boolean): boolean;
function getParam(V: unknown, D: string, color?: boolean): string;
function getParam(V: unknown, D: boolean | number | string, color?: boolean) {
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

export const config = {
  runtime: 'edge'
};

const font = fetch(new URL('../../../fonts/Nunito-BlackItalic.ttf', import.meta.url)).then(res => res.arrayBuffer());

export default async function handler(req: NextApiRequest) {
  const queryParams = new URL(req.url!).searchParams;

  const fontData = await font;

  const c = getParam(queryParams.get('ct'), 69); // Current time
  const t = getParam(queryParams.get('tt'), 420); // Total time

  const col1 = getParam(queryParams.get('c1'), '000000', true);
  const col2 = getParam(queryParams.get('c2'), '000000', true);
  const col3 = getParam(queryParams.get('c3'), '000000', true);
  const col4 = getParam(queryParams.get('c4'), '000000', true);

  const p = (c / t) * 100;

  const text = getParam(queryParams.get('txt'), `undefined`);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: 40,
          width: 400,
          borderRadius: 23,
          backgroundImage: `linear-gradient(to right, #${col1}, #${col2}, #${col3}, #${col4})`
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 400,
            borderRadius: 23,
            backgroundSize: `${p}% 100%`,
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.3))'
          }}>
          <p
            className="displayText"
            style={{
              color: 'white',
              font: `900 20px Nunito italic`
            }}>
            {text}
          </p>
        </div>
      </div>
    ),
    {
      width: 400,
      height: 40,
      fonts: [
        {
          name: 'Nunito',
          data: fontData,
          style: 'italic',
          weight: 900
        }
      ]
    }
  );
}
