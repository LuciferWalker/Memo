import React, { useState,useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("white");
  const [colorb, setColorb] = useState("#658BD6");
  const [colorc, setColorc] = useState("white");

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/createdmemos");
    }
  }, []);

  const rmLink = {
   textDecoration: 'none'
  }

  return (
    <div>
        <div style={{ paddingLeft: "40px" }}>
          <div style={{ display: "flex",flexDirection:'row' }}>
              <div style={{width:'15%',cursor: "pointer"}}>
                  <Link to="/dashboard/createProject" style={rmLink}>
                    <h4
                      style={{ color: colorc }}
                      onClick={() => {
                        // setCreateMemo(false);
                        // setBoughtMemo(false);
                        setColor("white");
                        setColorb("white");
                        // setCreatePost(true);
                        setColorc("#658BD6");
                      }}
                    >
                      CREATE
                    </h4>{" "}
                  </Link>

                  <h4>STORAGE</h4>

                  <Link to="/dashboard/createdMemos"  style={rmLink}>
                    {" "}
                    <h4
                      onClick={() => {
                        // setCreateMemo(true);
                        // setBoughtMemo(false);
                        setColor("white");
                        setColorb("#658BD6");
                        // setCreatePost(false);
                        setColorc("white");
                      }}
                      style={{ color: colorb }}
                    >
                      CREATED MEMOS
                    </h4>
                  </Link>

                  <Link to="/dashboard/boughtMemos"  style={rmLink}>
                    {" "}
                    <h4
                      onClick={() => {
                        // setCreateMemo(false);
                        // setBoughtMemo(true);
                        setColor("#658BD6");
                        // setCreatePost(false);
                        setColorb("white");
                        setColorc("white");
                      }}
                      style={{ color: color }}
                    >
                      BOUGHT MEMOS
                    </h4>{" "}
                  </Link>

                  <h4>ANALYTICS</h4>
                  <h4>ACCOUNT</h4>
                </div>
              <div>
              <Outlet />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
