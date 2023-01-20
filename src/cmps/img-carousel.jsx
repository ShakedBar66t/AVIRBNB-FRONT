import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router";
// import { width } from "@mui/system";

export  function PreviewImgCarousel({stay}) {
    const navigate = useNavigate()
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  
  };

  return (
    <Slider {...settings} style={{width:'100%',position:'relative'}} >
    {/* <Slider className="img-carousel" {...settings}> */}
        {stay.imgUrls.map((img,idx)=>{
            return <div   onClick={() => { navigate(`/explore/${stay._id}`) }} key={img+idx}><img  className="stay-preview-img" src={img}/></div>
           
        })}
      {/* <div>
      
        <img  src={imgs[0]} className="stay-preview-img"/>
      </div>
      <div>
      
        <img  src={imgs[1]} className="stay-preview-img"/>
      </div>
      <div>
       
        <img  src={imgs[2]} className="stay-preview-img"/>
      </div>
      <div>
       
        <img src={imgs[3]} className="stay-preview-img"/>
      </div>
      <div>
      <img  src={imgs[3]} className="stay-preview-img"/>
        
      </div> */}
  
    </Slider>
  );
}