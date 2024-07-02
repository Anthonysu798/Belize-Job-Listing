import React from 'react';
import { FaUsers, FaDollarSign, FaBriefcase, FaUserShield } from 'react-icons/fa';

const metrics = [
  {
    icon: FaUsers,
    color: 'text-purple-600',
    value: 123,
    label: 'Total Users',
    change: '3.35% ↑',
    changeColor: 'text-green-600'
  },
  {
    icon: FaDollarSign,
    color: 'text-green-600',
    value: 50,
    label: 'Total Subscription Users',
    change: '3.35% ↑',
    changeColor: 'text-green-600'
  },
  {
    icon: FaBriefcase,
    color: 'text-blue-600',
    value: 512,
    label: 'Total Job Posted',
    change: '-0.35% ↓',
    changeColor: 'text-red-600'
  },
  {
    icon: FaUserShield,
    color: 'text-blue-600',
    value: 2,
    label: 'Total Admin Users',
    change: '0.15% ↑',
    changeColor: 'text-green-600'
  }
];

const UserData: React.FC = () => {
  return (
    <>
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-4 shadow rounded-lg flex items-center">
          <metric.icon className={`text-4xl ${metric.color} mr-4`} />
          <div>
            <p className="text-xl font-bold">{metric.value}</p>
            <p className="text-sm">{metric.label}</p>
            <p className={`${metric.changeColor}`}>{metric.change}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserData;
