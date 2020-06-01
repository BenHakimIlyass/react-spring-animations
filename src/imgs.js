import React from "react";
import styled, { Box } from "@xstyled/styled-components";
import { useTrail, useSpring, animated, config } from "react-spring";
import useOnScreen from "./useOnSreen";
import useScroll from "./useScroll";
const Imgs = () => {
  const [imgsRef, imgsOnScreen] = useOnScreen();
  const trail = useTrail(arr.length, {
    config,
    opacity: imgsOnScreen ? 1 : 0,
    y: imgsOnScreen ? 0 : 20,
    from: { opacity: 0, y: 20 }
  });
  const [springs, set] = useSpring(() => ({
    transform: "translate3d(0px,0px,0px)",
    config
  }));
  const filter = e => e % 2 === 0;
  const scroll = useScroll();

  React.useEffect(() => {
    const maxScroll = scroll <= 80 ? scroll : 80;
    set({ transform: `translate3d(0px,${-maxScroll}px,0px)` });
  }, [scroll]);

  return (
    <Box maxWidth={1280} width="90%" mx="auto">
      <Box
        row
        ref={imgsRef}
        mx="auto"
        mt={70}
        justifyContent="space-around"
        forwardedAs={animated.div}
      >
        {imgsOnScreen &&
          trail.map(({ y, height, ...rest }, index) => (
            <Ground
              key={index}
              style={{
                ...rest,
                transform: y.interpolate(y => `translate3d(0,${y}px,0)`)
              }}
            >
              <animated.div style={filter(index) ? springs : {}}>
                <Img src={arr[index]} alt="" />
                <h2 style={{ color: colors[index] }}>{index + 1}</h2>
              </animated.div>
            </Ground>
          ))}
      </Box>
    </Box>
  );
};

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  z-index: 1;
`;
const Ground = styled(animated.div)`
  position: relative;
  width: 180px;
  height: 300px;
  h2 {
    left: 45px;
    top: 190px;
    color: grey;
    opacity: 0.6;
    font-size: 90px;
    position: absolute;
  }
`;
const colors = ["#02252b", "#c2a39d", "#d6b067", "#68718e"];
const URL1 =
  "https://images.unsplash.com/photo-1590986445481-f0545666e60a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
const URL2 =
  "https://images.unsplash.com/photo-1590967563224-7b831c6a89df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
const URL3 =
  "https://images.unsplash.com/photo-1590599652693-63e25ae1cc79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
const URL4 =
  "https://images.unsplash.com/photo-1590935261924-cdc77658f024?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
const arr = [URL1, URL2, URL3, URL4];
export default Imgs;
