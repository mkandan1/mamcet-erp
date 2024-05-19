import { Avatar } from '../components/Avatar';
import React from 'react';

export const Profile = () => {
  const studentData ={
    name:'Elamaran',
    rolenumber:'812021205013',
    role:'Student',
    year:'III',
    dept:'IT',
    mail:'elamaran.it21@mamcet.com',
    mobile:'9025893850',
    batch:'2021 - 2025'

  };
  return (
    <>
      <div className='grid gap-4 p-4  bg-gradient-to-r from-violet-200 to-pink-200 relative overflow-hidden'>
        {/* Profile Header Section */}
        <div className='rounded-lg border-2 w-full h-80 flex items-center p-4 '>
          <div className='relative flex items-center'>
            {/* Profile Picture */}
            <div className='w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 flex-shrink-0'>
              <div className='w-full h-full flex items-center justify-center'>
                <Avatar/>
              </div>
            </div>
            {/* Profile Details */}
            <div className='ml-4 relative z-10'>
              <h1 className='text-2xl font-bold'>{studentData.name}</h1>
              <p className='text-md text-gray-500'>{studentData.rolenumber}</p>
              <p className='text-sm text-primary'>{studentData.batch}</p>
            </div>
            <div className='ml-20 relative z-10'>
            <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Year :</th>
                      <td>{studentData.year}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>Department :</th>
                      <td>{studentData.dept}</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>E-Mail :</th>
                      <td>elamaran.it21@mamcet.com</td>
                    </tr>
                    <tr>
                      <th>Mobile :</th>
                      <td>+91 {studentData.mobile}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content Section */}
        <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='flex gap-10 w-full h-48 flex items-center justify-center text-white text-xl'>
          <div className="radial-progress" style={{"--value":80}} role="progressbar">80%</div>
          <div className="radial-progress text-primary" style={{"--value":70}} role="progressbar">70%</div>
          <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{"--value":70}} role="progressbar">70%</div>
          </div>
          <div className='w-full h-48 flex items-center justify-center text-white text-xl'>
          <ul className="timeline text-sm">
            <li>
              <div className="timeline-start timeline-box text-gray-700">2021 - 2022</div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              </div>
              <hr className="bg-primary"/>
            </li>
            <li>
            <hr className="bg-primary"/>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              </div>
              <div className="timeline-end timeline-box text-gray-700">2022 - 2023</div>
              <hr className="bg-primary"/>
            </li>
            <li>
              <hr className="bg-primary"/>
              <div className="timeline-start timeline-box text-gray-700">2023 - 2024</div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              </div>
              <hr/>
            </li>
            <li>
              <hr/>
              <hr/>
            </li>
            <li>
              <hr/>
              <div className="timeline-end timeline-box text-gray-700">2021 - 2022</div>
              <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
              </div>
            </li>
          </ul>
          </div>
          {/* IF NEEDED */}
          <div className='bg-tranparent w-full h-48 flex items-center justify-center text-white text-xl'>
            {/* Content Block 3 */}
          </div>
          <div className='bg-tranparent w-full h-48 flex items-center justify-center text-white text-xl'>
            {/* Content Block 4 */}
          </div>
        </div>
      </div>
    </>
  );
};