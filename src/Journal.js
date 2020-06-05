import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Layout, PageHeader, Button, Empty, Card, Popconfirm } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Journal = () => {
  const [hasJournal, setJournalStatus] = useState(false);
  const [journalRes, setJournalRes] = useState();
  const [entries, setEntries] = useState();

  async function createJournal() {
    try {
      console.log("creating journal");
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/create_journal`;
      const res = await axios.post(requestUrl, {
        title: document.getElementById("journal_title").value,
        user_id: sessionStorage.getItem("id"),
      });
      console.log("after axios");
      console.log(res);
      setJournalStatus(true);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function checkStatus() {
    try {
      console.log("checking");
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/get_journal_id`;
      const res = await axios.get(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      console.log(res.data.length);
      if (res.data.length > 0) {
        setJournalRes(res.data);
        setJournalStatus(true);
      } else setJournalStatus(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function deleteJournal() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_journal`;
      const res = await axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      alert("Your journal has been deleted!");
      setJournalStatus(false);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function readEntries() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/entry`;
      const res = await axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      setEntries(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function createEntry() {
    try {
      const requestJournal = `http://flip2.engr.oregonstate.edu:56334/get_journal_id`;
      const id = await axios.post(requestJournal, {
        user_id: sessionStorage.getItem("id"),
      });
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/create_entry`;
      const res = await axios.post(requestUrl, {
        journal_id: id.id,
        food_eaten: document.getElementById("food_eaten"),
      });
      alert("Entry added!");
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  const createEntryCards = () => {
    return entries.map(
      (entries,
      (index) => {
        return (
          <Card
            id={index.entry_id + 1}
            title={index.date_created}
            bordered={true}
            actions={[
              <EditOutlined
                id={index.entry_id}
                key="edit"
                onClick={editEntry}
              />,
            ]}
          >
            Food Eaten: {index.food_eaten}
          </Card>
        );
      })
    );
  };

  async function updateEntry(e_id, f_id) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/update_entry`;
      const res = await axios.post(requestUrl, {
        entry_id: e_id,
        food_eaten: document.getElementById(f_id),
      });
      setEntries(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  const editEntry = (e) => {
    // use e.target.id to get id and value of that input box
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Journal" />
        </Layout>
        {hasJournal ? (
          <Button
            type="primary"
            style={{ margin: "10px" }}
            onClick={createEntry}
          >
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
          <Popconfirm
            placement="bottom"
            title={
              <div>
                What would you like to name your journal?
                <br />
                <input id="journal_title" type="text" />
              </div>
            }
            onConfirm={createJournal}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button type="primary" style={{ margin: "10px" }}>
              Create Journal
            </Button>
          </Popconfirm>
        )}

        {hasJournal ? (
          <div>
            <h1>Test Title</h1>
            <b>Date Created: </b> test date
          </div>
        ) : (
          <Empty />
        )}
        <br />
      </div>
    </div>
  );
};

export default Journal;
