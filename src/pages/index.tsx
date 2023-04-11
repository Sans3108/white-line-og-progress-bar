export default function Home() {
  return (
    <main>
      <div
        className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 bg-gray-800"
        style={{
          maxWidth: 'max-content',
          borderRadius: '20px',
          paddingRight: '40px',
          paddingLeft: '40px',
          paddingTop: '20px',
          paddingBottom: '20px',
          transform: 'translate(-50%, -50%)',
          border: '1px solid white',
          margin: '0'
        }}>
        <h1 className="text-center">
          Parameter Docs for{' '}
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            /api/bar
          </code>
        </h1>
        <br></br>
        <p>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            c: number = 69
          </code>{' '}
          Current time (in seconds)<br></br>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            t: number = 420
          </code>{' '}
          Total time (in seconds)<br></br>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            c1: string = '
            <span
              style={{
                backgroundColor: '#000000',
                color: 'white'
              }}>
              000000
            </span>
            '
          </code>{' '}
          First gradient color (hex string)<br></br>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            c2: string = '
            <span
              style={{
                backgroundColor: '#000000',
                color: 'white'
              }}>
              000000
            </span>
            '
          </code>{' '}
          Second gradient color (hex string)<br></br>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            c3: string = '
            <span
              style={{
                backgroundColor: '#000000',
                color: 'white'
              }}>
              000000
            </span>
            '
          </code>{' '}
          Third gradient color (hex string)<br></br>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            c4: string = '
            <span
              style={{
                backgroundColor: '#000000',
                color: 'white'
              }}>
              000000
            </span>
            '
          </code>{' '}
          Fourth gradient color (hex string)<br></br>
          <code
            className="bg-slate-600"
            style={{
              color: 'cyan'
            }}>
            txt: string = 'undefined'
          </code>{' '}
          Text to display<br></br>
        </p>
        <br></br>
        <p className="text-center">
          Btw I have no idea why are you here, go away lol<br></br>This page wasn't made for mobile...
        </p>
      </div>
    </main>
  );
}
