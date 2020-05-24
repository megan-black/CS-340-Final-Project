import React from "react";
import { Menu, Button } from "antd";

const items = [
  {
    label: "Recipes",
    href: "/recipe",
  },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Journal",
    href: "/journal",
  },
];

const Nav = () => (
  <Menu
    mode="horizontal"
    style={{
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Menu.Item>
      <a href="/">
        <h1>Recipe Builder</h1>
      </a>
    </Menu.Item>
    {items.map((item) => (
      <Menu.Item key={item.label}>
        <a href={item.href}>
          <h3>{item.label}</h3>
        </a>
      </Menu.Item>
    ))}
    <Menu.Item>
      <Button href="/account">Account</Button>
    </Menu.Item>
  </Menu>
);

export default Nav;
