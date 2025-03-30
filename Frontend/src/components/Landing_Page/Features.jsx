import React from 'react';
import { motion } from 'framer-motion';
import cardContent from './features.js';

const Features = () => {
  return (
    <div className='my-50 flex flex-col items-center'>
      <h1 className='text-5xl text-center mb-20'>
        Powerful Features for Seamless <br /> <span>Communication</span>
      </h1>
      <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-6'>
        {cardContent.Cards.map((card, index) => {
          const IconComponent = card.icon; // Get the icon component
          return (
            <motion.div
              key={index}
              className='group card shadow-md rounded-lg p-6 bg-white text-center '
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger animation
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",backgroundColor:'#386fe7'}} // Hover effect
            >
              <div>
                {IconComponent && <IconComponent className="text-blue-600 w-12 h-12 mb-4 mx-auto group-hover:text-white" />}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="text-gray-600 mt-2 group-hover:text-white">{card.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
