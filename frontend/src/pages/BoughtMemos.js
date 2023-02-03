import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MemoContext } from '../context/MemoContext'
import { NotificationManager } from 'react-notifications'
import Spinner from 'react-spinners/ClipLoader'
import { BASE_URL, formatBytes } from '../utils'

const BoughtMemos = () => {
  const navigate = useNavigate()
  const [boughtProjects, setBoughtProjects] = useState(null)
  const { account: userAddress } = useContext(MemoContext)

  const getBoughtProjects = async (userAddress) => {
    const response = await fetch(
      `${BASE_URL}/boughtProjects?address=${userAddress}`,
    )
    const projects = await response.json()
    setBoughtProjects(projects)
  }

  useEffect(() => {
    getBoughtProjects(userAddress)

    if (!userAddress) {
      navigate('/')
      NotificationManager.info('Connect Your Wallet!', 'Warning', 3000)
    }
  }, [])
  console.log(boughtProjects)

  return (
    <>
      {!boughtProjects ? (
        <div style={{ marginLeft:'400px', marginTop: '120px' }}>
          <Spinner color="white" size={100} />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '440px',
            overflowY: 'auto',
          }}
        >
          <h2>BOUGHT PROJECTS</h2>
          {boughtProjects == null ? (
            <h3 style={{ color: 'white' }}>
              No Projects Bought, yet &#59;&#41;
            </h3>
          ) : (
            boughtProjects?.map((card, index) => (
              <>
                <table
                  key={index}
                  onClick={() => navigate(`/explore/${card.projectId}`)}
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)',
                    padding: '0px',
                  }}
                >
                  <tr>
                    <td style={{ paddingLeft: '40px' }}>
                      <h5>{card.projectName}</h5>
                    </td>
                    <td style={{ paddingLeft: '80px' }}></td>
                    <td>
                      <h5>File Size: {formatBytes(card.fileSize)}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '340px', paddingLeft: '40px' }}>
                      <h5>{card.Description}</h5>
                      <h5>{card.Date || ''}</h5>
                    </td>
                    <td style={{ width: '270px' }}></td>
                    <td style={{ width: '200px' }}>
                      <h5>
                        {' '}
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
      )}
    </>
  )
}
export default BoughtMemos
