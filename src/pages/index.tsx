import { queryParamList, invertColor } from '@/utils/functions';
import Link from 'next/link';
import Head from 'next/head';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

const tw = resolveConfig(tailwindConfig);

export default () => {
  const params: JSX.Element[] = queryParamList().map(item => {
    const typeColors = {
      number: tw.theme!.colors!.number as string,
      boolean: tw.theme!.colors!.boolean as string,
      string: tw.theme!.colors!.string as string
    };

    const valueStyle: React.CSSProperties = item.isColor
      ? {
          color: invertColor(`#${item.defaultValue}`, true),
          backgroundColor: `#${item.defaultValue}`
        }
      : {
          color: typeColors[item.valueType]
        };

    const value: JSX.Element = (
      <span>
        {item.valueType === 'string' ? <span className='text-string'>'</span> : null}
        <span style={valueStyle}>{item.defaultValue}</span>
        {item.valueType === 'string' ? <span className='text-string'>'</span> : null}
      </span>
    );

    return (
      <span key={item.name} className='text-comment'>
        <code>
          <span className='text-keyword'>{item.name}</span>
          <span className='text-keyword'>:</span> <span className='text-type'>{item.valueType}</span> <span className='text-default'>=</span> {value}
          <span className='text-default'>;</span>
        </code>
        {' // '}
        {item.description}
        <br></br>
      </span>
    );
  });

  return (
    <div>
      <Head>
        <title>Parameter Docs</title>
      </Head>
      <main>
        <div className='flex justify-center items-start flex-col absolute top-1/2 left-1/2 max-w-max rounded-[20px] px-[40px] py-[20px] -translate-x-1/2 -translate-y-1/2 shadow-custom m-0 bg-dark font-code text-comment'>
          <h1>
            // Parameter Docs for{' '}
            <Link href='/api/progress-bar' className='underline text-link'>
              /api/progress-bar
            </Link>
          </h1>
          <br></br>
          <p>{...params}</p>
          <br></br>
          <p>
            // Btw I have no idea why are you here, go away lol<br></br>// This page wasn't made for mobile...
          </p>
        </div>
      </main>
    </div>
  );
};
