/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Navbar(props) {
  const [allFolders, setAllFolders] = useState(props.allFolders);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {toggle === true ? (
        <div className={window.innerWidth > 1000 ? 'sideNav scrollbar' : 'sideNavSmall scrollbar'}>
          <div className="d-flex justify-content-end">
            <button className="m-4" onClick={() => setToggle(!toggle)}>
              =
            </button>
          </div>
          {props.allFolders.length > 0 &&
            props.allFolders.map((folder, index) => (
              <ul className="navbar-nav text-center">
                <li className="nav-item active">
                  <span
                    className="nav-link"
                    onClick={() =>
                      props.folderPut(folder.id, folder.name, !folder.dashboard, folder.toggle)
                    }
                  >
                    {folder.name}&nbsp;({folder.thought.length})
                  </span>
                </li>
              </ul>
            ))}
        </div>
      ) : (
        <div className="sideNavClosed">
          <button className="mx-4 mt-4" onClick={() => setToggle(!toggle)}>
            =
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;

Navbar.propTypes = {
  allFolders: PropTypes.array,
  folderPut: PropTypes.func,
};
