import './App.css';

function BG() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src='/bg.png'
          className='rotate-bg'
          style={{
            objectPosition: 'center',
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 80,
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontFamily: 'Pretendard',
          fontSize: 180,
        }}
      >
        <img
          src='/text.png'
          style={{
            width: 500,
          }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <BG />
    </>
  );
}

export default App;
