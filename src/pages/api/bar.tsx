import type { NextApiRequest } from 'next';
import { ImageResponse } from '@vercel/og';
import { getParam } from '@/utils/functions';
import { colord } from 'colord';

export const config = {
  runtime: 'edge'
};

const font = fetch(new URL('../../../fonts/Nunito-BlackItalic.ttf', import.meta.url)).then(res => res.arrayBuffer());

export default async function handler(req: NextApiRequest) {
  const queryParams = new URL(req.url!).searchParams;

  const fontData = await font;

  const c = getParam(queryParams.get('c'), 69); // Current time
  const t = getParam(queryParams.get('t'), 420); // Total time

  const c1 = getParam(queryParams.get('c1'), '000000', true);
  const bgc1 = colord(`#${c1}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const c2 = getParam(queryParams.get('c2'), '000000', true);
  const bgc2 = colord(`#${c2}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const c3 = getParam(queryParams.get('c3'), '000000', true);
  const bgc3 = colord(`#${c3}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const c4 = getParam(queryParams.get('c4'), '000000', true);
  const bgc4 = colord(`#${c4}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const p = (c / t) * 100;

  const text = getParam(queryParams.get('txt'), `undefined`);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '400px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div
          style={{
            borderRadius: '23px',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to right, #${bgc1}, #${bgc2}, #${bgc3}, #${bgc4})`
          }}>
          <div
            style={{
              borderRadius: '23px',
              height: '100%',
              display: 'flex',
              width: `${p}%`,
              overflow: 'hidden'
            }}>
            <div
              style={{
                inset: 0,
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                borderRadius: '23px',
                height: '100%',
                width: '400px',
                backgroundImage: `linear-gradient(to right, #${c1}, #${c2}, #${c3}, #${c4})`
              }}></div>
          </div>
        </div>
        <p
          style={{
            color: 'white',
            font: `900 20px Nunito italic`,
            position: 'absolute',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'hidden'
          }}>
          {text}
        </p>
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
