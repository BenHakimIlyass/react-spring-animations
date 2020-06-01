import React from "react";
import styled, { Box } from "@xstyled/styled-components";
import { useSpring, animated, useChain, config } from "react-spring";
import useOnScreen from "./useOnSreen";
import useTextTransit from "./useTextTransit";
import { h1, p } from "./assets";
import Grid from "./grid";
const Svg = ({ style }) => {
  return (
    <Box position="absolute" left={0}>
      <animated.svg
        width={window.innerWidth}
        style={style}
        height="1002"
        viewBox="0 0 1341 1002"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1339 0.5C1339 0.5 1405.72 403.387 1242.5 544.5C1073.22 690.851 870.745 446.654 669.5 544.5C629.807 563.799 611.227 581.328 572.5 602.5C311.618 745.123 149.736 595.874 40.5001 774C-15.9796 866.099 6.99999 1042.5 6.99999 1042.5"
          stroke="white"
          stroke-width="3"
        />
      </animated.svg>
    </Box>
  );
};
const Hero = () => {
  /**p animation */
  const pRef = React.useRef();
  const animatedP = useTextTransit(pRef, p);

  /**h1 animation */
  const h1Ref = React.useRef();
  const animatedH1 = useTextTransit(h1Ref, h1);

  /**img animation */
  const [imgOnScreenRef, imgOnScreen] = useOnScreen();
  const imgRef = React.useRef();
  const spring = useSpring({
    ref: imgRef,
    opacity: imgOnScreen ? 1 : 0,
    transform: imgOnScreen
      ? "translate3d(0px,0px,0px)"
      : "translate3d(300px,0px,0px)",
    from: {
      opacity: 0,
      transform: "translate3d(300px,0px,0px)"
    }
  });

  /**svg animation */
  const drawSvgRef = React.useRef(true);
  const svgDraw = useSpring({
    from: {
      filter: "drop-shadow(4px 4px 10px rgba(255, 255, 255, 0))",

      strokeDashoffset: 3000,
      opacity: 0,
      strokeDasharray: 3000
    },
    config: config.molasses,
    delay: 1000,
    to: async (next, cancel) => {
      await next({
        filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.7))",
        strokeDashoffset: 0,
        strokeDasharray: 3000,
        opacity: 1
      });
    },
    ref: drawSvgRef
  });

  /**orchestrator */
  useChain([h1Ref, pRef, drawSvgRef, imgRef], [0.3, 0.6, 0.9]);
  return (
    <Box
      height={window.innerHeight}
      backgroundColor="#000"
      overflow="hidden"
      position="relative"
    >
      <Svg style={svgDraw} />
      <Box
        maxWidth={1280}
        width="90%"
        mx="auto"
        pt={window.innerHeight / 4}
        forwardedAs={Grid}
        rowGap="20px"
        columnGap="100px"
        columns="minmax(100px, 570px) minmax(100px, 570px)"
        rows="repeat(2, 300px)"
      >
        <Wrapper>
          {animatedH1.map(({ item, props, key }) => (
            <animated.span style={props} key={key}>
              {item + " "}
            </animated.span>
          ))}
          {animatedP.map(({ item, props, key }) => (
            <animated.p style={props} key={key}>
              {item + " "}
            </animated.p>
          ))}
          <Flex>
            <p style={{ fontWeight: 500 }}>Get in touch</p>
            <div />
          </Flex>
        </Wrapper>
        <Img src={URL} alt="" ref={imgOnScreenRef} style={spring} />
      </Box>
    </Box>
  );
};
const Wrapper = styled.div`
  grid-row: 1;
  grid-column: 1;
  span {
    font-style: normal;
    font-weight: bold;
    font-size: 58px;
    color: white;
  }
  p {
    font-style: normal;
    font-weight: 300;
    font-size: 21px;
    z-index: 99;
    color: #f0f4f8;
  }
`;
const Img = styled(animated.img)`
  grid-row: 2;
  grid-column: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: space-around;
  div {
    width: 50px;
    height: 2px;
    background-color: white;
  }
`;
const URL =
  "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
export default Hero;
