import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Layout, PageHeader, Button, Empty, Card, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Journal = () => {
  const [hasJournal, setJournalStatus] = useState();
  const [journalRes, setJournalRes] = useState();
  const [entries, setEntries] = useState();
  const [hasEdit, setEdit] = useState(false);
  const [foodEaten, setFoodEaten] = useState();

  async function createJournal() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/create_journal`;
      await axios.post(requestUrl, {
        title: document.getElementById("journal_title").value,
        user_id: sessionStorage.getItem("id"),
      });
      setJournalStatus(true);
      checkStatus();
    } catch (err) {
      alert("An error occurred!");
    }
  }

  async function checkStatus() {
    try {
      const uid = sessionStorage.getItem("id");

      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/journal`;
      const res = await axios.post(requestUrl, {
        user_id: uid,
      });
      if (res.data.length > 0) {
        setJournalRes(res.data[0]);
        setJournalStatus(true);
      } else setJournalStatus(false);
    } catch (err) {
      alert("An error occurred!");
    }
  }

  async function deleteJournal() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_journal`;
      await axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      alert("Your journal has been deleted!");
      setJournalStatus(false);
    } catch (err) {
      alert("An error occurred!");
    }
  }

  async function readEntries() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/entry`;
      const res = await axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      if (res.data.length > 0) setEntries(res.data);
    } catch (err) {
      alert("An error occurred!");
    }
  }

  async function createEntry() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/create_entry`;
      await axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
        food_eaten: document.getElementById("food_eaten").value,
      });
      alert("Entry added!");
      document.location.href = "/journal";
    } catch (err) {
      alert("An error occurred!");
    }
  }

  async function updateEntry(e_id, f_id) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/update_entry`;
      const res = await axios.post(requestUrl, {
        entry_id: e_id,
        food_eaten: f_id,
      });
      setEntries(res.data);
      setEdit(false);
      alert("Entry has been updated!");
      document.location.href = "/journal";
    } catch (err) {
      alert("An error occurred!");
    }
  }

  async function deleteEntry(e_id) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_entry`;
      await axios.post(requestUrl, {
        entry_id: e_id,
      });
      alert("Entry has been deleted!");
      document.location.href = "/journal";
    } catch (err) {
      alert("An error occurred!");
    }
  }

  const handleKeyPress = (e, e_id, f_id) => {
    if (e.which === 13) {
      console.log("key pressed");
      updateEntry(e_id, f_id);
    }
  };

  const createEntryCards = () => {
    var entryNo = 0;
    if (entries && entries.length > 0) {
      return entries.map(
        (entries,
        (index) => {
          entryNo += 1;
          return (
            <Card
              key={index.food_eaten}
              id={entryNo}
              title={
                "Entry #" +
                entryNo +
                " | Created " +
                index.date_made.substring(0, 10)
              }
              bordered={true}
              style={{ marginTop: "15px", maxWidth: "35%" }}
              actions={[
                <EditOutlined
                  id={index.entry_id}
                  key="edit"
                  onClick={(e) => editEntry(e)}
                />,
                <DeleteOutlined
                  id={index.entry_id - 1}
                  key="edit"
                  onClick={(e) => deleteEntry(index.entry_id)}
                />,
              ]}
            >
              Food Eaten:{" "}
              {hasEdit ? (
                <input
                  type="text"
                  placeholder={foodEaten}
                  onChange={(e) => {
                    index.food_eaten = e.target.value;
                  }}
                  onKeyPress={(e) =>
                    handleKeyPress(e, index.entry_id, index.food_eaten)
                  }
                />
              ) : (
                index.food_eaten
              )}
            </Card>
          );
        })
      );
    }
  };

  const editEntry = (e) => {
    setFoodEaten(document.getElementById(e.currentTarget.id).key);
    setEdit(true);
    // use e.target.id to get id and value of that input box
  };

  useEffect(() => {
    checkStatus();
    readEntries();
  }, []);

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Journal" />
        </Layout>
        {hasJournal === true ? (
          <Popconfirm
            placement="bottom"
            title={
              <div>
                What food did you eat?
                <br />
                <input id="food_eaten" type="text" />
              </div>
            }
            onConfirm={createEntry}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button type="primary" style={{ margin: "10px" }}>
              Create Entry
            </Button>
          </Popconfirm>
        ) : (
          <Button type="disabled" style={{ margin: "10px" }}>
            Create Entry
          </Button>
        )}
        {hasJournal === true ? (
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

        {hasJournal === true ? (
          <div>
            <h1>{journalRes.title}</h1>
            <b>Date Created: </b> {journalRes.date_created.substring(0, 10)}
            {createEntryCards()}
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
