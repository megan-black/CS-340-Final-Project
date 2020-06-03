import React, { useState } from "react";
import Nav from "./Nav";
import {
  Layout,
  PageHeader,
  Input,
  Button,
  Empty,
  Tooltip,
  Comment,
  Avatar,
} from "antd";

const Journal = () => {
  async function deleteJournal() {
    try {
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Journal" />
        </Layout>
        <Button type="primary" style={{ margin: "10px" }}>
          Create Entry
        </Button>
        <Button type="primary" style={{ margin: "10px" }}>
          Delete Journal
        </Button>
        <Comment
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>This is a sample journal entry for this particular user.</p>
          }
          style={{ maxWidth: "75%", borderStyle: "solid", borderWidth: "1px" }}
        />
        <br />
      </div>
    </div>
  );
};

export default Journal;
