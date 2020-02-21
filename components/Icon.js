import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function Icon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.size ? props.size : 30}
      style={{ marginBottom: -3 }}
      color={props.color ? props.color : Colors.tabIconDefault}
    />
  );
}
