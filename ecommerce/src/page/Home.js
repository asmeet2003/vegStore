
  import React, { useEffect, useRef, useState } from "react";
  import { useSelector } from "react-redux";
  import CardFeature from "../component/CardFeature";
  import HomeCard from "../component/HomeCard";
  import { GrPrevious, GrNext } from "react-icons/gr";
  import FilterProduct from "../component/FilterProduct";
  import AllProduct from "../component/AllProduct";


  const Home = () => {
    const [mainHeading, setMainHeading] = useState("VEGI STORE");
  const [subHeading, setSubHeading] = useState("Your COMFORT ZONE");
    const productData = useSelector((state) => state.product.productList);
    const homeProductCartList = productData.slice(1, 5);
    const homeProductCartListVegetables = productData.filter(
      (el) => el.category === "vegetable",
      []
    );
    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);

    const slideProductRef = useRef();
    const nextProduct = () => {
      slideProductRef.current.scrollLeft += 200;
    };
    const preveProduct = () => {
      slideProductRef.current.scrollLeft -= 200;
    };
    useEffect(() => {
       setTimeout(() => {
        setMainHeading("FRESH VEGGIES");
        setSubHeading("Delicious and Nutritious");
      }, 5000);
    }, []);
    return (
      <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full animate-bounce">
            <p className="text-sm font-medium text-slate-900">YOUR NEED</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-red-600 text-4xl md:text-7xl font-bold py-3">
            {mainHeading}{" "}
            <span className="text-blue-600">{subHeading}</span>
          </h2>
          <p className="py-3 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries
          </p>
          <button className="font-bold bg-gradient-to-r from-red-500 to-yellow-500 text-slate-200 px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:from-red-600 hover:to-yellow-600">
          BE HAPPY
          </button>


        </div>

          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
            {homeProductCartList[0]
              ? homeProductCartList.map((el) => {
                  return (
                    <HomeCard
                      key={el._id}
                      id={el._id}
                      image={el.image}
                      name={el.name}
                      price={el.price}
                      category={el.category}
                    />
                  );
                })
              : loadingArray.map((el, index) => {
                  return <HomeCard key={index+"loading"} loading={"Loading..."} />;
                })}
          </div>
        </div>

        {/* <div className="">
          <div className="flex w-full items-center">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">
              Fresh Vegetables
            </h2>
            <div className="ml-auto flex gap-4">
              <button
                onClick={preveProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
              >
                <GrPrevious />
              </button>
              <button
                onClick={nextProduct}
                className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
              >
                <GrNext/>
              </button>
            </div>
          </div>
          <div
            className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
            ref={slideProductRef}
          > */}

  <div className="">
    {/* <div className="flex w-full items-center">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">
        Fresh Vegetables
      </h2>
      <div className="ml-auto flex gap-4">
        <button
          onClick={preveProduct}
          className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded-md transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <GrPrevious />
        </button>
        <button
          onClick={nextProduct}
          className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded-md transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <GrNext />
        </button>
      </div>
    </div>
    <div
      className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all relative hover:overflow-x-auto"
      ref={slideProductRef}
    >
    
            {homeProductCartListVegetables[0]
              ? homeProductCartListVegetables.map((el) => {
                  return (
                    <CardFeature
                      key={el._id+"vegetable"}
                      id={el._id}
                      name={el.name}
                      category={el.category}
                      price={el.price}
                      image={el.image}
                    />
                  );
                })
              : loadingArrayFeature.map((el,index) => (
                  <CardFeature loading="Loading..." key={index+"cartLoading"} />
                ))}
          </div> */}
          <div>
          <h1 className="font-bold text-2xl text-slate-800 mb-4">Fresh Vegetables</h1> 
          </div>
          <div className="flex w-full items-center relative">
    <h2 className="font-bold text-2xl text-slate-800 mb-4">
    
    </h2>
    <div className="ml-auto flex gap-9 m-5">
      <button
        onClick={preveProduct}
        className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded-md transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 absolute left-0 top-1/2 transform -translate-y-1/2"
      >
        <GrPrevious />
      </button>
      <button
        onClick={nextProduct}
        className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded-md transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 absolute right-0 top-1/2 transform -translate-y-1/2"
      >
        <GrNext />
      </button>
    </div>
  </div>
  <div
    className="flex gap-5 overflow-hidden relative"
    ref={slideProductRef}
    onMouseEnter={() => slideProductRef.current.classList.add('hover:overflow-x-auto')}
    onMouseLeave={() => slideProductRef.current.classList.remove('hover:overflow-x-auto')}
  >
    {homeProductCartListVegetables[0]
      ? homeProductCartListVegetables.map((el) => {
          return (
            <CardFeature
              key={el._id+"vegetable"}
              id={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
              className="transition-transform duration-300 hover:scale-105"
            />
          );
        })
      : loadingArrayFeature.map((el,index) => (
          <CardFeature loading="Loading..." key={index+"cartLoading"} />
        ))}
  </div>

        </div>
        
        <AllProduct heading={"Your Product"}/>
      </div>
    );
  };

  export default Home;
