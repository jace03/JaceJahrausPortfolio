import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import endpoints from '../constants/endpoints';
// import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  buttonStyle: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
          <Link to="/About">
            <button type="button" style={styles.buttonStyle}>About</button>
          </Link>
        </div>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
