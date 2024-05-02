import React from 'react';
import { useSpring, animated } from 'react-spring';
import logo1 from '../assest/logo1.png'
const About = () => {
  const fadeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <animated.div style={fadeAnimation} className="max-w-3xl w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center">About Vegi Store</h1>
        <div className="flex items-center justify-center mb-6">
          <img src={logo1} alt="Vegi Store Logo" className="h-24 w-auto" />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          At Vegi Store, we are passionate about providing fresh and high-quality produce to our customers. 
          Our mission is to promote healthy living and sustainable eating habits by offering a wide selection of 
          organic fruits and vegetables sourced directly from local farmers and growers.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          We believe in the importance of supporting local communities and reducing our environmental footprint. 
          That's why we prioritize partnerships with local farmers who share our values of ethical farming practices 
          and environmental stewardship. By choosing Vegi Store, you're not only getting the freshest produce, 
          but you're also contributing to a more sustainable future for generations to come.
        </p>
      </animated.div>
    </div>
  );
};

export default About;
