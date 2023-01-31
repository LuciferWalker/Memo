import { useNavigate } from "react-router-dom";

const BoughtMemos = (props) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "440px",
        overflowY: "auto",
      }}
    >
      <h2>BOUGHT PROJECTS</h2>
      {props.project == null ? (
        <h3 style={{ color: "white" }}>No Projects Bought, yet &#59;&#41;</h3>
      ) : (
        props.project?.map((card, index) => (
          <>
            <table
              key={index}
              onClick={() => navigate(`/explore/${card.projectId}`)}
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)",
                padding: "0px",
              }}
            >
              <tr>
                <td style={{ paddingLeft: "40px" }}>
                  <h5>{card.projectName}</h5>
                </td>
                <td style={{ paddingLeft: "80px" }}></td>
                <td>
                  <h5>File Size: {card.fileSize}</h5>
                </td>
              </tr>
              <tr>
                <td style={{ width: "340px", paddingLeft: "40px" }}>
                  <h5>{card.Description}</h5>
                  <h5>{card.Date || ""}</h5>
                </td>
                <td style={{ width: "270px" }}></td>
                <td style={{ width: "200px" }}>
                  <h5>
                    {" "}
                    PRICE: {card.tokenPrice} FIL
                    <br /> $ DOWNLOAD
                  </h5>
                </td>
              </tr>
            </table>
            <br />
          </>
        ))
      )}
    </div>
  );
};
export default BoughtMemos;
