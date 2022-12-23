/* eslint-disable no-unused-vars */
import "../App.css";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";

function Dashboard(props) {
  const [thought, setThought] = useState(props.reminder.text);
  const [dashboard, setDashboard] = useState(props.reminder.dashboard);
  const [allFolder, setAllFolder] = useState(props.allFolders);

  return (
    <>
      <div className="dropdown">
        <span
          className=""
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          example
        </span>
        <div
          className="dropdown-menu text-center"
          aria-labelledby="dropdownMenuButton"
        >
          {/* <small className="borderBottom">{props.folder.name}</small> */}
          <br />
          <div
            className="text-center"
            // onClick={() =>
            //   props.thoughtPut(
            //     props.thought.id,
            //     props.thought.thought,
            //     !props.thought.dashboard,
            //     props.thought.folder.id,
            //   )
            // }
          >
            DB
          </div>
          <div className="text-center">X</div>
        </div>
      </div>
      <div className="mx-auto text-center">
        <TextareaAutosize
          id="textareaautosize"
          className="col-10 borderNone ml-1 py-1 pl-2"
          placeholder="Type your Thought here"
          type="text"
          defaultValue={props.thought.thought}
          // onChange={(e) => {
          //   setThought(e.target.value);
          //   setDashboard(props.thought.dashboard);
          // }}
          // onBlur={(e) =>
          //   thought !== props.thought.thought &&
          //   props.thoughtPut(
          //     props.thought.id,
          //     thought,
          //     props.thought.dashboard,
          //     props.folder.id
          //   )
          // }
        />
      </div>
    </>
  );
}

export default Dashboard;
// vercel
Dashboard.propTypes = {
  thought: PropTypes.object,
  folder: PropTypes.object,
  allFolders: PropTypes.array,
  allThoughts: PropTypes.array,
  thoughtPut: PropTypes.func,
  folderPost: PropTypes.func,
  thoughtDelete: PropTypes.func,
};
