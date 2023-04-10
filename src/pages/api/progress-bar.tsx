// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from 'next';

import { ImageResponse } from '@vercel/og';

function formatDuration(sec: number, soft = false) {
  const formatInt = (int: number) => (int < 10 ? `0${int}` : int);
  if (!sec || !Number(sec)) return '00:00';
  if (typeof soft !== 'boolean') soft = false;

  const seconds = Math.round(sec % 60);
  const minutes = Math.floor((sec % 3600) / 60);
  const hours = Math.floor(sec / 3600);

  if (hours > 0) return soft ? `${formatInt(hours)}h ${formatInt(minutes)}m` : `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
  if (minutes > 0) return soft ? `${formatInt(minutes)}m` : `${formatInt(minutes)}:${formatInt(seconds)}`;
  return soft ? `${formatInt(seconds)}s` : `00:${formatInt(seconds)}`;
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

export const config = {
  runtime: 'edge'
};

const VarelaRoundFontPromise = fetch(new URL('../../../assets/VarelaRound-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer());

export default async function handler(req: NextApiRequest) {
  const VarelaRoundFont = await VarelaRoundFontPromise;

  const queryParams = new URL(req.url!).searchParams;

  const currentTime = getParam(queryParams.get('ct'), 69); // Current time
  const totalTime = getParam(queryParams.get('tt'), 69); // Total time
  const isCurrent = getParam(queryParams.get('ic'), true); // Is it the current song?
  const isPaused = getParam(queryParams.get('ip'), false); // Is it paused?
  const isLive = getParam(queryParams.get('il'), false); // Is it Live?
  const position = getParam(queryParams.get('pt'), 0); // Position

  const col1 = getParam(queryParams.get('c1'), 'FF77D1');
  const col2 = getParam(queryParams.get('c2'), 'FEA0BE');
  const col3 = getParam(queryParams.get('c3'), 'FE898F');
  const col4 = getParam(queryParams.get('c4'), 'FF5B3A');

  const forceText = queryParams.get('tx');

  // e.g. "02:08 / 07:36 - 05:28 left"
  const formattedTime = `${formatDuration(currentTime)} / ${formatDuration(totalTime)} - ${formatDuration(totalTime - currentTime)} left`;

  // Compose the string that's going to be written
  const str = isCurrent ? (isLive ? '- LIVE -' : formattedTime) + (isPaused ? ' (Paused)' : '') : position === 1 ? 'Playing next...' : `Waiting for ${position} songs to play...`;

  const displayString = forceText ? forceText : str;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: 46,
          width: 415,
          borderRadius: 23,
          backgroundImage: `linear-gradient(to right, #${col1}, #${col2}, #${col3}, #${col4})`
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 46,
            width: 415,
            borderRadius: 23,
            backgroundSize: '10% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.2))'
          }}>
          <p
            style={{
              color: 'white',
              font: `700 18.4px Varela Round`
            }}>
            {displayString}
          </p>
        </div>
      </div>
    ),
    {
      width: 415,
      height: 46,
      fonts: [
        {
          name: 'Varela Round',
          data: VarelaRoundFont,
          style: 'normal',
          weight: 700
        }
      ]
    }
  );
}
