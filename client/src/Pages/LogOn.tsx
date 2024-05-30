import './LogOn.scss';
import { useNavigate } from 'react-router-dom';

function LogOn({users, setUserInfo}: any) {
  const navigate = useNavigate();
  const grabUserData = (event: any) => {
    event.preventDefault();
    const userName = event.target?.form[0]?.value;

    const userData = users.filter((user: any) => user.userName === userName);

    setUserInfo(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    navigate('/items');
  };
  
  return (
    <div className="log-on-container">
      <form>
        <div className="container">
          <label htmlFor="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <button type="submit" onClick={(event: any) => grabUserData(event)}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LogOn;