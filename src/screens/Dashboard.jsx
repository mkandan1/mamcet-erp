import React from 'react';
import { Container } from '../components/Container';
import { Link } from 'react-router-dom';
import { Breadcamps } from '../components/Breadcumps';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const dataStudents = [
  { name: '2019', students: 400 },
  { name: '2020', students: 300 },
  { name: '2021', students: 500 },
  { name: '2022', students: 450 },
];


const dataEmployees = [
  { name: 'IT', employees: 20 },
  { name: 'CSE', employees: 25 },
  { name: 'ECE', employees: 15 },
  { name: 'CIVIL', employees: 15 },
  { name: 'EEE', employees: 23 },
  { name: 'MECH', employees: 30 },
];

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth.user);

  return (
    <Container title="Dashboard">
      <h3 className="text-[18px] font-medium mt-4 mb-4">
        Overview
      </h3>

      <div className="gap-6 flex flex-col justify-start md:flex-row md:space-x-6">
        {/* User Info Card */}
        <div className="bg-white p-4 rounded-md shadow flex flex-col items-center w-full md:w-1/4">
          <img
            src={user.photo + '?alt=media'}
            alt="User Profile"
            className="h-24 w-24 rounded-full mb-4"
          />
          <h4 className="text-lg font-medium">
            {user.firstName} {user.lastName}
          </h4>
          <p className="text-sm text-gray-500">{user.designation}</p>
          <p className="text-sm mt-3 text-gray-500">{user.email}</p>
          <Link to='/profile' className='btn bg-blue-600 text-white font-light mt-5'>My Account</Link>
        </div>

        {/* Dummy Charts and Notifications Row */}
        <div className="flex flex-col md:flex-row md:space-x-6 w-full md:w-3/4">

          {/* Notifications */}
          <div className="bg-white p-4 rounded-md shadow flex-grow">
            <div className='flex justify-between'>
              <h4 className="text-lg font-medium mb-2">Notifications</h4>
              <p className='text-sm text-blue-900 cursor-pointer'>Mark as read</p>
            </div>
            <ul className="space-y-2">
              <li className="bg-yellow-100 p-4 rounded-md shadow">
                <p className="text-sm font-medium">
                  New student registration is open.
                </p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </li>
              <li className="bg-red-100 p-4 rounded-md shadow">
                <p className="text-sm font-medium">
                  Upcoming faculty meeting tomorrow.
                </p>
                <p className="text-xs text-gray-600">5 hours ago</p>
              </li>
              <li className="bg-green-100 p-4 rounded-md shadow">
                <p className="text-sm font-medium">
                  Examination schedule released.
                </p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div className='flex flex-wrap gap-4 mt-4'>

        {/* Total Students Chart */}
        <div className="bg-white p-4 rounded-md shadow flex-grow">
          <h4 className="text-lg font-medium mb-2">Total Students</h4>
          <BarChart width={500} height={300} data={dataStudents}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Employees Chart */}
        <div className="bg-white p-4 rounded-md shadow">
          <h4 className="text-lg font-medium mb-2">Employees</h4>
          <BarChart width={400} height={300} data={dataEmployees}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="employees" fill="#ff7300" />
          </BarChart>
        </div>
      </div>
    </Container>

  );
};
