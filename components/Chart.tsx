import React, { useEffect } from 'react';

export default function Chart(props: any) {
  const [data, setData] = React.useState<any>([]);

  // for (let txn of props.transactions) {
  //   setData([...data, [txn.amount, txn.timestamp]]);
  // }

  useEffect(() => {
    const thisData = [];
    for (let txn of props.transactions) {
      thisData.push({ amount: txn.amount, timeStamp: txn.timestamp });
    }
    setData(thisData);
    console.log(thisData);
  }, []);

  return (
    <div>
      {data.map((item: any) => {
        return (
          <span
            className={`vol`}
            data-height={item.amount}
            key={item.timestamp}
          >
            {item.amount}
          </span>
        );
      })}
    </div>
  );
}
