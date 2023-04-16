import type { NextApiRequest } from 'next';
import { ImageResponse } from '@vercel/og';
import { getQueryData } from '@/utils/functions';
import { colord } from 'colord';

export const config = {
  runtime: 'edge'
};

const font = fetch(new URL('public/Nunito-BlackItalic.ttf', import.meta.url)).then(res => res.arrayBuffer());

export default async function progressBar(req: NextApiRequest) {
  const fontData = await font;

  const params = getQueryData(req);

  // How to make any good dev mad:

  const c = params.find(p => p.name === 'c')!.value as number;
  const t = params.find(p => p.name === 't')!.value as number;
  const w = params.find(p => p.name === 'w')!.value as number;
  const h = params.find(p => p.name === 'h')!.value as number;
  const b = params.find(p => p.name === 'b')!.value as number;
  const f = params.find(p => p.name === 'f')!.value as number;
  const c1 = params.find(p => p.name === 'c1')!.value as string;
  const c2 = params.find(p => p.name === 'c2')!.value as string;
  const c3 = params.find(p => p.name === 'c3')!.value as string;
  const c4 = params.find(p => p.name === 'c4')!.value as string;
  const txt = params.find(p => p.name === 'txt')!.value as string;

  const p = (c / t) * 100;

  const bgc1 = colord(`#${c1}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const bgc2 = colord(`#${c2}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const bgc3 = colord(`#${c3}`).darken(0.3).desaturate(0.5).toHex().slice(1);
  const bgc4 = colord(`#${c4}`).darken(0.3).desaturate(0.5).toHex().slice(1);

  return new ImageResponse(
    (
      <div
        tw='flex justify-center items-center'
        style={{
          width: `${w}px`,
          height: `${h}px`
        }}>
        <div
          tw='h-full w-full flex items-center'
          style={{
            borderRadius: `${b}px`,
            backgroundImage: `linear-gradient(to right, #${bgc1}, #${bgc2}, #${bgc3}, #${bgc4})`
          }}>
          <div
            tw='h-full flex overflow-hidden'
            style={{
              borderRadius: `${b}px`,
              width: `${p}%`
            }}>
            <div
              tw='inset-0 bg-no-repeat absolute h-full'
              style={{
                borderRadius: `${b}px`,
                width: `${w}px`,
                backgroundImage: `linear-gradient(to right, #${c1}, #${c2}, #${c3}, #${c4})`
              }}></div>
          </div>
        </div>
        <p
          tw='text-white font-[900] font-[Nunito] italic absolute text-center truncate'
          style={{
            fontSize: `${f}px`
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
