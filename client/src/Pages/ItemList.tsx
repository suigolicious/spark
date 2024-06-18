function ItemList({ userInfo, setUserInfo }: any) {
  const userInfoStorage = localStorage.getItem('userInfo') || '';
  const userInfoFinal = userInfo || JSON.parse(userInfoStorage);

  const addToItemsList = (event: any) => {
    event.preventDefault();
    setUserInfo([...userInfoFinal, {
      [event.target?.form[0].value]: {
        W: event.target?.form[1].value,
        H: event.target?.form[2].value
      }
    }]);
  };

  const saveToItemsList = (event: any) => {
    event.preventDefault();
    const updateData = async () => {
      const result = await fetch('http://localhost:8080/submitUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userInfo: userInfo})
      });

      const resultInJSON = await result.json();

      console.log(resultInJSON);
    };

    updateData();
  }

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

          <button type="submit" onClick={(event: any) => {addToItemsList(event)}}>Add</button>
          <button type="submit" onClick={(event: any) => {saveToItemsList(event)}}>Save</button>
        </div>
      </form>
      </div>
      {userInfoFinal[0]?.items.map((info: any) => {
        return (
          <div>
            {info.Name}: 
            <div>
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