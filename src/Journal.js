import React, { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
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
  const [res, setRes] = useState();

  async function readEntries() {
    try {
      const fetchCookie = `http://flip2.engr.oregonstate.edu:56334/read_cookie`;
      const resCookie = axios.get(fetchCookie);
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/journal`;
      const res = axios.post(requestUrl, {
        user_id: resCookie,
      });
      setRes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function deleteJournal() {
    try {
      const fetchCookie = `http://flip2.engr.oregonstate.edu:56334/read_cookie`;
      const resCookie = axios.get(fetchCookie);
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_journal`;
      const res = axios.post(requestUrl, {
        user_id: resCookie,
      });
      console.log("Your entire journal has been deleted!");
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  const createEntryCards = () => {};

  const addEntry = () => {};

  const editEntry = () => {};

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
