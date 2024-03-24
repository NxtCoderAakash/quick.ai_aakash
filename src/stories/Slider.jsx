import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './slider.css';

export const Slider = ({ primary, size, type, status, label, ...props }) => {
  const [sliderValue1, setSliderValue1] = useState(0)
  const [sliderValue2, setSliderValue2] = useState(50)

  useEffect(() => {
      setSliderValue1(0)
      if(type==="Discrete"){
        if(sliderValue2>80){
          setSliderValue2(80)
        }
        else if(sliderValue2>60){
          setSliderValue2(60)
        }
        else if(sliderValue2>40){
          setSliderValue2(40)
        }
        else if(sliderValue2>20){
          setSliderValue2(20)
        }
        else{
          setSliderValue2(0)
        }
      }
    }, [type]
  )
  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === "slider1") {
      if (type !== "Range" || !(type === "Range" && value >= sliderValue2)) {
        setSliderValue1(value)
      }

    }
    else {
      if (type !== "Range" || !(type === "Range" && value <= sliderValue1)) {
        setSliderValue2(value)
      }

    }

  }

  const getRangeCoveredValue = () => {
    const value = (Math.abs(sliderValue1 - sliderValue2) * 4.8);
    return `${value}px`
  }


  return (

    <div>
      {/* <div className='bg-container-thumb'>
            <div>
                <div className='slider-thumb-variation thumb-variation-one'></div>
                <div className='slider-thumb-variation thumb-variation-two'></div>
                <div className='slider-thumb-variation thumb-variation-three'></div>
            </div>
            <div>
                <div className='slider-thumb-variation thumb-variation-four'></div>
                <div className='slider-thumb-variation thumb-variation-five'></div>
                <div className='slider-thumb-variation thumb-variation-six'></div>
            </div>
    </div> */}
      <div className='bg-container-slider' {...props} >
        <span className='bg-span-total-length'></span>
        <span className='bg-span-range-length' style={{ width: getRangeCoveredValue(), left: `${4.8 * sliderValue1}px` }} ></span>
        {type === "Range" &&
          <><input step={`${type === "Discrete" ? "20" : "0"}`} type="range" min="0" max="100" value={sliderValue1} className={`slider slider-${size} slider-${status} slider-1 ${type === "Range" ? "slider-1-range" : ""}`} id="myRange" onChange={onChangeValue} name="slider1" ></input>
            <span className='tooltip-1' style={{ left: `${4.8 * sliderValue1 - 8 - sliderValue1 * 0.3}px` }}>
              <div className='tooltip-content'>
                <span></span>{sliderValue1}%
              </div>
            </span>
          </>}
        <input step={`${type === "Discrete" ? "20" : "0"}`} type="range" min="0" max="100" value={sliderValue2} className={`slider slider-${size} slider-${status} slider-2`} id="myRange" onChange={onChangeValue} name="slider2"></input>
        <span className='tooltip-1' style={{ left: `${4.8 * sliderValue2 - 16 - sliderValue2 * 0.20}px` }}>
          <div className='tooltip-content'>
            <span></span>{sliderValue2}%
          </div>
        </span>
        {type === "Discrete" && <span className='bg-container-dotter slider-dotter-${type}'>
          {["dotter-one", "dotter-two", "dotter-three", "dotter-four", "dotter-five", "dotter-six"].map((item, i) => (<span key={i} className={`dotter ${item} ${sliderValue2 > (20 * i) ? "coveredPart" : ""}`}></span>))}

        </span>}

      </div>

    </div>
  );
};

Slider.propTypes = {
  /**
   * How should be the type of the range?
   */
  type: PropTypes.oneOf(['Continuous', 'Range', "Discrete"]),
  /**
   * how should the cursor look like?
   */
  status: PropTypes.oneOf(['Default', 'Hover', "Focus"]),
  /**
   * How large should the cursor be?
   */
  size: PropTypes.oneOf(['24', '32']),
  /**
   * label of the Component
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Slider.defaultProps = {
  size: '24',
  onClick: undefined,
  type: "Continuous",
  status: "Default",
  label: "Slider"
};
