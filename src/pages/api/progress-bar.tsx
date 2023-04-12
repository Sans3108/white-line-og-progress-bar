import type { NextApiRequest } from 'next';
import { ImageResponse } from '@vercel/og';
import { getQueryData } from '@/utils/functions';
import { colord } from 'colord';

export const config = {
  runtime: 'edge'
};

const font = fetch(new URL('../../../fonts/Nunito-BlackItalic.ttf', import.meta.url)).then(res => res.arrayBuffer());

export default async function handler(req: NextApiRequest) {
  const fontData = await font;

  const { c, t, w, h, b, f, c1, c2, c3, c4, txt } = getQueryData(req);

  const p = (c / t) * 100;

  const bgc1 = colord(`#${c1}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const bgc2 = colord(`#${c2}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const bgc3 = colord(`#${c3}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const bgc4 = colord(`#${c4}`).darken(0.3).desaturate(0.5).toHex().slice(1);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: `${w}px`,
          height: `${h}px`,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div
          style={{
            borderRadius: `${b}px`,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundImage: `linear-gradient(to right, #${bgc1}, #${bgc2}, #${bgc3}, #${bgc4})`
          }}>
          <div
            style={{
              borderRadius: `${b}px`,
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
                borderRadius: `${b}px`,
                height: '100%',
                width: `${w}px`,
                backgroundImage: `linear-gradient(to right, #${c1}, #${c2}, #${c3}, #${c4})`
              }}></div>
          </div>
        </div>
        <p
          style={{
            color: 'white',
            font: `900 ${f}px Nunito italic`,
            position: 'absolute',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'hidden'
          }}>
          {txt}
        </p>
      </div>
    ),
    {
      width: w,
      height: h,
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
