import * as React from "react";

import styled, { Box, css } from "@xstyled/styled-components";

const Grid = styled(({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
})`
  ${props => css`
    display: ${props.inline ? "inline-grid" : "grid"};
    ${ifPresent(props.rows, "grid-template-rows")}
    ${ifPresent(props.columns, "grid-template-columns")}
    ${ifPresent(props.rowGap, "grid-row-gap")}
    ${ifPresent(props.columnGap, "grid-column-gap")}
    ${ifPresent(props.gap, "grid-gap")}
    ${ifPresent(props.area, "grid-area")}
    ${ifPresent(props.areas, "grid-areas")}
  `}
`;
const ifPresent = (condition, result) => condition && `${result}:${condition};`;
export default Grid;
