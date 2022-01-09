export const checkAuth = async () => {
  let auth = !!localStorage.getItem("token");
  if (auth) {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }).then((data) => {
      return data.ok;
    });
  }
  return false;
};

export const useAuth = () => {
  return !!localStorage.getItem("token"); // only checks if a token is sat. No real auth yet
};

export const dataTypes = {
  bloodSamples: "Blood Samples",
  housingInfo: "Housing Info",
  bankInfo: "Bank Info",
  employmentStatus: "Employment Status",
  taxInfo: "Tax Info",
};

export const setUsers = async (requests, setReqUsers) => {
  let accAddressIds = "";
  for (let i = 0; i < requests.length; i++) {
    if (accAddressIds.includes(requests[i].requesterAddress));
    else {
      accAddressIds += requests[i].requesterAddress;
      if (requests[i + 1]) accAddressIds += "&";
    }
  }

  accAddressIds &&
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/accaddress/${accAddressIds}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setReqUsers(data);
      });
};

export const setData = async (id, setData) => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}/data/userid/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data) return;
      setData(data);
    });
};

// fetch data(type) for denied requests
export const setDataFromIDs = async (ids, setData) => {
  ids &&
    fetch(`${process.env.REACT_APP_BACKEND_URL}/data/datatype/id/${ids}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setData(data);
      });
};

export const createViewData = (requests, data, users) => {
  let dataArr = [];
  for (let i = 0; i < requests.length; i++) {
    let dataObj = undefined;
    let username = users.find(
      ({ accountAddress }) => accountAddress === requests[i].requesterAddress
    )?.username;
    let d = data.find(({ _id }) => _id === requests[i].dataId);
    let dataType = d?.dataType;
    let content = d?.content;

    dataObj = {
      // shown
      _id: requests[i]._id,
      username: username,
      dataType: dataType,
      content: content,
      retention: requests[i].retention,
      // needed for accept/deny req
      requesterAddress: requests[i].requesterAddress,
      dataId: requests[i].dataId,
    };
    dataArr.push(dataObj);
  }
  return dataArr;
};
