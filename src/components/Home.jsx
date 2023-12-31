import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
// import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  buttonStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
    borderWidth: 5,
    borderColor: '#0DAA0A',
    borderRadius: '42px',
    border: '3px solid rgba(#0DAA0A)',
  },
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function homeButtonAction() {
  alert('you clicked me');
}

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);
  return data ? (
    <Fade>
      <div style={styles.mainContainer} className="backgroundImage">
        <div style={{ flexDirection: 'row' }}>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        {/* <Social /> */}
        <div>
          <button
            type="button"
            onClick={homeButtonAction}
            style={styles.buttonStyle}
          >
            About Me
          </button>
        </div>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
