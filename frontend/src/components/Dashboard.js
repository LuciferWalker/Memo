import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/createdmemos");
    }
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <table>
          <tr>
            <td style={{ width: "20%", padding: "15px", cursor: "pointer" }}>
              <Link to="/dashboard/createProject">
                <h4
                  // style={{ color: colorc }}
                  onClick={() => {
                    // setCreateMemo(false);
                    // setBoughtMemo(false);
                    // setColor("white");
                    // setColorb("white");
                    // setCreatePost(true);
                    // setColorc("#658BD6");
                  }}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                >
                  CREATE
                </h4>{" "}
              </Link>

              <h4>STORAGE</h4>

              <Link to="/dashboard/createdMemos">
                {" "}
                <h4
                  onClick={() => {
                    // setCreateMemo(true);
                    // setBoughtMemo(false);
                    // setColor("white");
                    // setColorb("#658BD6");
                    // setCreatePost(false);
                    // setColorc("white");
                  }}
                  // style={{ color: colorb }}
                >
                  CREATED MEMOS
                </h4>
              </Link>

              <Link to="/dashboard/boughtMemos">
                {" "}
                <h4
                  onClick={() => {
                    // setCreateMemo(false);
                    // setBoughtMemo(true);
                    // setColor("#658BD6");
                    // setCreatePost(false);
                    // setColorb("white");
                    // setColorc("white");
                  }}
                  // style={{ color: color }}
                >
                  BOUGHT MEMOS
                </h4>{" "}
              </Link>

              <h4>ANALYTICS</h4>
              <h4>ACCOUNT</h4>
            </td>
          </tr>
        </table>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
