import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg";

const Search = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="#000000" fill="none" {...props}>
      <Path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth={props.strokeWidth} strokeLinejoin="round" />
    </Svg>
  );

export default Search;