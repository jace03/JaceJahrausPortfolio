import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const imageStyle = {
  display: 'block',
  margin: 20,
  borderRadius: 20,
  maxWidth: '100%',
  height: 'auto',
  width: 450,
};
const styles = {
  titleStyle: {
    padding: 20,
  },
  iconStyle: {
    height: 50,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    display: 'flex',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 30,
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  // const renderSkillsIntro = (intro) => (
  //   <h4 style={styles.introTextContainer}>
  //     <ReactMarkdown children={intro} />
  //   </h4>
  // );
  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    >
                      <img src={data?.imageSource} style={imageStyle} alt="profile" />
                    </div>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    {data.skills?.map((rows) => (
                      <div key={rows.title} style={styles.titleStyle}>
                        <br />
                        <h3 style={styles.titleStyle}>{rows.title}</h3>
                        {rows.items.map((item) => (
                          <div key={item.title} style={{ display: 'inline-block' }}>
                            <img
                              style={styles.iconStyle}
                              src={item.icon}
                              alt={item.title}
                            />
                            <p style={{ textAlign: 'center' }}>{item.title}</p>
                          </div>
                        ))}
                        <h3 style={styles.titleStyle}>{rows.titleAmature}</h3>
                        {rows.itemsAmature.map((item) => (
                          <div key={item.titleAmature} style={{ display: 'inline-block' }}>
                            <img
                              style={styles.iconStyle}
                              src={item.icon}
                              alt={item.title}
                            />
                            <p style={{ textAlign: 'center' }}>{item.title}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
