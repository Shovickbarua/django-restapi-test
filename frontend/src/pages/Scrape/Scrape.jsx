import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import ScrapeApi from '../../api/ScrapeApi';

const Scrape = () => {
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        getScrape();
    }, []);

    const getScrape = async () => {
        const res = await ScrapeApi.index();
        if(res){
            setState(res);
        }
    };


    return (
      <div>
        {message && 
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
            <p className="font-bold">{message}</p>
        </div>
        }
          <div className="max-w-7xl m-auto mt-5">
            <div className="flex justify-between ">
                <div className="text-lg text-gray-500">
                    <h1>All Inventories</h1>
                </div>
                <div>
                    <Link to='/scrape' className="mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4">
                        Scrape 
                    </Link>
                    <Link to='/scrape-list' className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-4">
                        Scrape list
                    </Link>
                </div>
            </div>
              <div className="flex flex-col mt-2">
                  <div className="overflow-x-auto shadow-md sm:rounded-lg">
                      <div className="inline-block min-w-full align-middle">
                          <div className="overflow-hidden ">
                              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                  <thead className="bg-gray-100 dark:bg-gray-700">
                                      <tr>
                                          <th scope="col" className="p-4">
                                              <div className="flex items-center">
                                                  <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                  <label for="checkbox-all" className="sr-only">checkbox</label>
                                              </div>
                                          </th>
                                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                               Url
                                          </th>
                                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                              Emails
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  {state.map((scrape, index) => (
                                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={index}>
                                          <td className="p-4 w-4">
                                              <div className="flex items-center">
                                                  <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                  <label for="checkbox-table-1" className="sr-only">checkbox</label>
                                              </div>
                                          </td>
                                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{scrape.url}</td>
                                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{scrape.emails}</td>
                                      </tr>
                                  ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
  
  export default Scrape;