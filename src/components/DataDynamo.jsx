import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  addButton: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

const pageSize = 10; // Number of items per page

function DataDynamo() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data from your JSON file
    fetch('/profile/dataDynamo.json') // Replace with the correct path
      .then((res) => res.json())
      .then((res) => setData({ cars: res })) // Assuming 'cars' is the array property
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const handleAddCar = () => {
    // Add a new car to the data (for simplicity, let's generate a random car)
    setData((prevData) => ({
      ...prevData,
      cars: [...(prevData?.cars || []), { id: Date.now(), brand: 'Random Brand', model: 'Random Model' }],
    }));
  };

  const handleRemoveCar = (id) => {
    // Remove a car based on its ID
    setData((prevData) => ({
      ...prevData,
      cars: (prevData?.cars || []).filter((car) => car.id !== id),
    }));
  };

  const totalPages = Math.ceil((data?.cars || []).length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCars = (data?.cars || []).slice(startIndex, endIndex);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h2>Cars</h2>
        <ul>
          {currentCars.map((car) => (
            <li key={car.id}>
              {`${car.brand} ${car.model}`}
              <button type="button" onClick={() => handleRemoveCar(car.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div style={styles.paginationContainer}>
          <p>
            Page
            {currentPage}
            of
            {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
        <button type="button" style={styles.addButton} onClick={handleAddCar}>
          Add Car
        </button>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default DataDynamo;
