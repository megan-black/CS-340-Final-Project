import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Layout, PageHeader, Button, Empty, Card } from "antd";

const Journal = () => {
  const [hasJournal, setJournalStatus] = useState(false);
  const [journalRes, setJournalRes] = useState();
  const [results, setRes] = useState();

  async function createJournal() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/create_journal`;
      const res = axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      setRes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function checkStatus() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/journal`;
      const res = axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      if (res.data) setJournalRes(res.data);
      else setJournalStatus(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function createEntry() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/create_entry`;
      const res = axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      setRes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function readEntries() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/journal`;
      const res = axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      setRes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function deleteJournal() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_journal`;
      const res = axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      alert("Your entire journal has been deleted!");
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  const createEntryCards = () => {};

  const addEntry = () => {};

  const editEntry = () => {};

  useEffect(() => {
    checkStatus();
    setJournalRes({
      title: "Test",
      date_created: "test",
      num_entries: "test",
    });
  }, []);

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Journal" />
        </Layout>
        {hasJournal ? (
          <Button type="primary" style={{ margin: "10px" }}>
            Create Entry
          </Button>
        ) : (
          <Button type="disabled" style={{ margin: "10px" }}>
            Create Entry
          </Button>
        )}
        {hasJournal ? (
          <Button
            type="primary"
            style={{ margin: "10px" }}
            onClick={deleteJournal}
          >
            Delete Journal
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ margin: "10px" }}
            onClick={createJournal}
          >
            Create Journal
          </Button>
        )}

        {hasJournal ? (
          <Card title="test" style={{ width: 300 }}>
            <p>Date Created: </p>
          </Card>
        ) : (
          <Empty />
        )}
        <br />
      </div>
    </div>
  );
};

export default Journal;
