import { useTransition } from "react-spring";

export default (ref, arr) => {
  const transitions = useTransition(arr, item => item.key, {
    ref: ref,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions;
};
