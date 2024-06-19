import { useEffect } from "react";
import './ItemList.scss';

function ItemList({ users, userInfo, setUserInfo }: any) {
  useEffect(() => {
    const userInfoStorage = localStorage.getItem('userInfo') || '';
    const userInfoFinal = userInfo || JSON.parse(userInfoStorage);
    setUserInfo(userInfoFinal);
  }, []);

  const addToItemsList = (event: any) => {
    event.preventDefault();
    userInfo[0].items.push({
      "Name": event.target?.form[0].value,
      "W": event.target?.form[1].value,
      "H": event.target?.form[2].value
    })
    const updatedUserInfo = [...userInfo];
    setUserInfo(updatedUserInfo);
  };

  const saveToItemsList = (event: any) => {
    event.preventDefault();
    users.forEach((user: any, i: number) => {
      if (user.userName === userInfo[0].userName) {
        users[i].items = userInfo[0].items;
      }
    });
    const updateData = async () => {
      const result = await fetch('http://localhost:8080/submitUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([...users])
      });

      const resultInJSON = await result.json();

      console.log(resultInJSON);
    };

    updateData();
  };

  const deleteItem = (index: any) => {
    userInfo && userInfo[0]?.items?.splice(index, 1);
    setUserInfo([...userInfo]);
  };

  return (
    <>
      <div>
        <form>
          <div className="container">
            <label htmlFor="item"><b>Item</b></label>
            <input type="text" placeholder="Enter Item" name="item" required />

            <label htmlFor="w"><b>Width</b></label>
            <input type="text" placeholder="Enter Width" name="w" required />

            <label htmlFor="h"><b>Height</b></label>
            <input type="text" placeholder="Enter Height" name="h" required />

            <button type="submit" onClick={(event: any) => { addToItemsList(event) }}>Add</button>
            <button type="submit" onClick={(event: any) => { saveToItemsList(event) }}>Save</button>
          </div>
        </form>
      </div>
      {userInfo && userInfo[0]?.items?.map((info: any, index: number) => {
        return (
          <div>
            {info.Name}:
            <button type="button" onClick={() => { deleteItem(index) }}>
              X
            </button>
            <div className="item-dimensions">
              <span>
                W: {info.W}
              </span>
              <span>
                H: {info.H}
              </span>
            </div>
          </div>
        )
      })}
    </>
  );
}

export default ItemList;