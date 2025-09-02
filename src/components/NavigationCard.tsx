import React from 'react';
import Image from 'next/image';
import { NavItem } from '@/data/navigation';

interface NavigationCardProps {
  item: NavItem;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <div className="relative h-48 w-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/400x200/f3f4f6/9ca3af?text=Image+Error`;
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{item.description}</p>
           <div className="mt-4">
               <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{item.category}</span>
           </div>
        </div>
      </a>
    </div>
  );
};

export default NavigationCard;