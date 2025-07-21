import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Breadcrumb.scss";

const CustomBreadcrumb = ({ items = [] }) => {
  return (
    <Breadcrumb className="custom-breadcrumb">
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={index === items.length - 1 ? "span" : Link}
          linkProps={index === items.length - 1 ? {} : { to: item.path }}
          active={index === items.length - 1}
        >
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
