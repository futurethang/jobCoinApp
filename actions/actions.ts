export const loginApiAction = async (user: string) => {
  const data = await fetch(
    `http://jobcoin.gemini.com/retaining-relapse/api/addresses/${user}`,
  )
    .then((res) => res.json())
    .then((data) => data);
  return data;
};

// export const logoutApiAction = async (user: string) => {
// const data = await fetch(
//   `http://jobcoin.gemini.com/retaining-relapse/api/addresses/${user}`,
// )
//   .then((res) => res.json())
//   .then((data) => data);
// return data;
// };

function callback(data) {
  console.log(data);
}

export const sendApiAction = async (
  fromAddress: string,
  toAddress: string,
  amount: number,
) => {
  fetch('http://jobcoin.gemini.com/retaining-relapse/api/transactions', {
    // Adding method type
    method: 'POST',
    // mode: 'cors',

    // Adding body or contents to send
    body: new URLSearchParams({
      fromAddress: fromAddress,
      toAddress: toAddress,
      amount: amount.toString(),
    }),

    // // Adding headers to the request
    // headers: {
    //   'Content-type':
    // },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log('Response', json);
    })
    .catch((error) => console.log('Error', error));
};
