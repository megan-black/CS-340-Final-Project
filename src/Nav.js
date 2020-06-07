import React, { useState, useEffect } from "react";
import { Menu, Button } from "antd";
import axios from "axios";

const Nav = () => {
  const [cookie, setCookie] = useState();

  async function readCookie() {
    try {
      console.log(sessionStorage.getItem("id"));
      setCookie(sessionStorage.getItem("id"));
    } catch (err) {
      console.log(err);
    }
  }

  async function clearCookie() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/clear_cookie`;
      await axios.get(requestUrl);
    } catch (err) {
      console.log(err);
    }
  }

  const signOut = () => {
    sessionStorage.setItem("id", -1);
    setCookie(sessionStorage.getItem("id"));
    clearCookie();
  };

  useEffect(() => {
    readCookie();
  }, []);

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

  return (
    <div>
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
            {cookie > -1 ? (
              <a href={item.href}>
                <h3>{item.label}</h3>
              </a>
            ) : (
              <div>
                <a href="/">
                  <h3>{item.label}</h3>
                </a>
              </div>
            )}
          </Menu.Item>
        ))}
        <Menu.Item>
          {cookie > -1 ? (
            <Button href="/account" onClick={signOut} type="secondary">
              Sign Out
            </Button>
          ) : (
            <Button href="/account" type="secondary">
              Log In
            </Button>
          )}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Nav;
