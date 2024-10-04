import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ScrapeApi from '../../api/ScrapeApi';

const ScrapeInput = () => {
const { id } = useParams();
const navigate = useNavigate();
  const [state, setState] = useState({
    url: "",
});
const [loading, setLoading] = useState(false); // Loading state added
const [message, setMessage] = useState("");

const handleChange = (e) => {
    const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
};


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const res = await ScrapeApi.scrape(state);
    if (res) {
        // setMessage(res.data.message);
        navigate('/scrape-list');
    }
    setLoading(false); 
};

  return (
    <div>
        {message && 
                <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                    <p className="font-bold">{message}</p>
                </div>
            }
        {/* {!fetchData ? */}
        <section className="max-w-7xl p-6 mx-auto">
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2'>
                <div className="flex justify-end">
                    <button type='submit' className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    {loading ? 'Submiting...' : 'Submit'} 
                    </button>
                </div>
            </div>
                <div className="grid grid-cols-1 gap-6 mt-4 ">
                    <div className="">
                        <label className="text-gray-700 dark:text-gray-200" for="name">Url</label>
                        <input id="url" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        name="url" value={state.url} onChange={handleChange} required/>
                    </div>
                </div>
            </form>
        </section>
        {/* : <div className='m-auto'><p className='text-2xl text-bold text-center'>Loading...</p> </div>} */}
    </div>
  )
}

export default ScrapeInput