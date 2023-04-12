import { getQueryMeta, invertColor } from '@/utils/functions';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const { c, t, w, h, b, f, c1, c2, c3, c4, txt } = getQueryMeta();

  const colors = {
    default: '#d4d4d4',
    keyword: '#9cdcfe',
    type: '#4ec9b0',
    number: '#b5cea8',
    string: '#ce9178',
    boolean: '#569cd6',
    comment: '#6a9955'
  };

  const params: JSX.Element[] = [c, t, w, h, b, f, c1, c2, c3, c4, txt].map(item => {
    const value: JSX.Element = (
      <span>
        {item.type === 'string' ? <span style={{ color: colors[item.type] }}>'</span> : null}
        <span
          style={
            item.isColor
              ? {
                  color: invertColor(`#${item.default}`, true),
                  backgroundColor: `#${item.default}`
                }
              : { color: colors[item.type] }
          }>
          {item.default}
        </span>
        {item.type === 'string' ? <span style={{ color: colors[item.type] }}>'</span> : null}
      </span>
    );

    return (
      <span key={item.param} style={{ color: colors.comment }}>
        <code>
          <span style={{ color: colors.keyword }}>{item.param}</span>
          <span style={{ color: colors.keyword }}>:</span> <span style={{ color: '#51bb7d' }}>{item.type}</span> <span style={{ color: '#ddd' }}>=</span> {value}
          <span style={{ color: '#ddd' }}>;</span>
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
        <div
          className='flex justify-center items-start flex-col absolute top-1/2 left-1/2'
          style={{
            maxWidth: 'max-content',
            borderRadius: '20px',
            paddingRight: '40px',
            paddingLeft: '40px',
            paddingTop: '20px',
            paddingBottom: '20px',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0px 10px 13px -7px #000, 5px 5px 15px 5px rgba(0,0,0,0)',
            margin: '0',
            backgroundColor: '#1f1f1f',
            color: colors.comment
          }}>
          <h1>
            // Parameter Docs for{' '}
            <code style={{ color: '#aac99c' }}>
              <Link href='/api/progress-bar' className='underline'>
                /api/progress-bar
              </Link>
            </code>
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
}
