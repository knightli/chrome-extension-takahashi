import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [mode, setMode] = useState<string>();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        remarkMode: "takahashi"
      },
      (items) => {
        setMode(items.remarkMode);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        remarkMode: mode
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus(undefined);
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div><img src="./logo.png" /></div>
      <hr></hr>
      <div>
        Mode: Remark It as :&nbsp;
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        >
          <option value="remark">remark</option>
          <option value="takahashi">takahashi</option>
        </select>
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
