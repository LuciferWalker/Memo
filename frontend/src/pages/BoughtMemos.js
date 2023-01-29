const BoughtMemos = () => {
    return(
    <div style={{height:'400px',overflowY:'auto'}}>
        <td style={{ width: "80%", padding: "10px" }}>
        <h3>BOUGHT PROJECTS</h3>
        <table
            style={{
            background:
                "linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)",
            padding: "0px",
            }}
        >
            <tr>
            <td style={{ paddingLeft: "40px" }}>
                <h5>MUSIC</h5>
            </td>
            <td style={{ paddingLeft: "80px" }}></td>
            <td><h5>File Size: 50MB</h5></td>
            </tr>
            <tr>
            <td style={{ width: "340px", paddingLeft: "40px" }}>
                <h5>
                This record is made up of music from around the globe.
                </h5>
                <h5>18. 05. 2020</h5>
            </td>
            <td style={{ width: "270px" }}></td>
            <td style={{ width: "200px" }}>
                <h5>
                {" "}
                Price: $4000
                <br /> $ DOWNLOAD
                </h5>
            </td>
            </tr>
        </table>
        </td>
    </div>
);
}
export default BoughtMemos;