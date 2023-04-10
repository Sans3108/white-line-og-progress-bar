export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen flex-col text-left">
      <h1>
        Parameter Docs for <code className="bg-gray-600">/api/bar</code>
      </h1>
      <br></br>
      <p>
        <code className="bg-gray-600">ct: number = 69</code> Current time (in seconds)<br></br>
        <code className="bg-gray-600">tt: number = 420</code> Total time (in seconds)<br></br>
        <code className="bg-gray-600">ic: boolean = true</code> Is it the current song?<br></br>
        <code className="bg-gray-600">ip: boolean = false</code> Is it paused?<br></br>
        <code className="bg-gray-600">il: boolean = false</code> Is it a livestream?<br></br>
        <code className="bg-gray-600">pt: number = 0</code> Position in queue<br></br>
        <code className="bg-gray-600">
          c1: string = '
          <span
            style={{
              backgroundColor: '#a63780'
            }}>
            FF77D1
          </span>
          '
        </code>{' '}
        First gradient color (hex string)<br></br>
        <code className="bg-gray-600">
          c2: string = '
          <span
            style={{
              backgroundColor: '#be476d'
            }}>
            FEA0BE
          </span>
          '
        </code>{' '}
        Second gradient color (hex string)<br></br>
        <code className="bg-gray-600">
          c3: string = '
          <span
            style={{
              backgroundColor: '#b13d43'
            }}>
            FE898F
          </span>
          '
        </code>{' '}
        Third gradient color (hex string)<br></br>
        <code className="bg-gray-600">
          c4: string = '
          <span
            style={{
              backgroundColor: '#783528'
            }}>
            FF5B3A
          </span>
          '
        </code>{' '}
        Fourth gradient color (hex string)<br></br>
        <code className="bg-gray-600">tx: string = undefined</code> Force custom text<br></br>
      </p>
      <br></br>
      <p>Btw I have no idea why are you here, please leave me to my madness</p>
    </main>
  );
}
