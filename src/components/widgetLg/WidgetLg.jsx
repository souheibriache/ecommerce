import { useState, useEffect } from "react";
import "./widgetLg.css";
import { userRequest } from "../../requestMethods";
import {format} from 'timeago.js'

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [orders, setorders] = useState([]);
  const [users, setusers] = useState([]);
  useEffect(() => {
    const getorders = async () => {
      try {
        const res = await userRequest.get('/orders')
        // setorders(res.data)
        res.data.map(async(item) => {
          const user = await userRequest.get('users/find/'+item.userId);
          setorders(prev => [...prev , {...item , user : user.data}])
        })
      } catch (err) {
        console.log(err)
      }
    }
    getorders()
  }, [])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map( (order) => {

          return(
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <img
                src={order.user?.img ? order.user?.img : 'https://bibliosud.omekas.mind-and-go.net/files/large/17ea8760c7dc81909f032ce92d94e4f340b1585a.jpg' }
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{order.user.username}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">$ {order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        )})}

      </table>
    </div>
  );
}
