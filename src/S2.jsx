import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const api = 'http://localhost/gujjufashion/database/';

function App() {
  const [data, setData] = useState([]); // State to store the response data as an empty array
  const [selectedId, setSelectedId] = useState(null); // State to store the selected id
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    axios.get(api)
      .then((response) => {
        console.log('Fetched Data:', response.data); // Log the response data
        setData(response.data); // Set the data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };

  useEffect(() => {
    if (selectedId !== null) {
      console.log('Selected ID:', selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    console.log('Data array:', data);
    data.forEach(item => console.log('Data ID:', item.id));
  }, [data]);



  const selectedData = data.length > 0 ? data.find(item => item.id === selectedId) : null;
  console.log('Selected Data:', selectedData);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className='bg-white'>
      <div className='container mx-auto flex justify-center place-items-center flex-col '>
        <h1 className='text-black'>{selectedData ? `Select an ID : ${selectedData.id}` : ''}</h1>

        <div>
          <select value={selectedId || ''} onChange={handleSelectChange}>
            <option value="" disabled>Select an ID</option>
            {data.map(item => (
              <option key={item.id} value={item.id}>{item.id}</option>
            ))}
          </select>
        </div>

        {selectedData ? (
          <div className="mt-4 w-full">
            {selectedData.image && <img src={`http://localhost/gujjufashion/uploads/${selectedData.image}`} className="w-1/5" alt={selectedData.image} />}
            <div className="bg-slate-500 w-full">
              <h5 className="">ID: {selectedData.id}</h5>
              <p className="">Name: {selectedData.name}</p>
              <p className="">Description: {selectedData.original_price}</p>
              <div className='grid grid-cols-6 gap-5'>
                {selectedData.images.map((img, index) => (
                  <img key={index} src={`http://localhost/gujjufashion/uploads/product_image/${img}`} className="h-64 w-64" alt={img} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No data selected</p>
        )}
        <div className='grid grid-cols-5 w-full gap-12'>
          {data.map((list, index) => (
            <div className='w-full px-4 pt-4 h-full text-center cursor-pointer' key={index}>
              <div className='h-5/6 overflow-hidden rounded-md'>
                <img src={`http://localhost/gujjufashion/uploads/${list.image}`} className='rounded-md scale-110 h-full w-full hover:scale-125 transition-all duration-300 ' alt={list.image} />
              </div>
              <div className='mt-2'>
                <h1 className='text-1xl'>{list.name}</h1>
                <span className='text-xl'>&#8377;&nbsp;{list.selling_price}&nbsp;/-</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
