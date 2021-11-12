import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('/users?new=true')
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => {
          return (
            <li className="widgetSmListItem" key={user._id} >
              <img
                src={user.img ? user.img : 'https://bibliosud.omekas.mind-and-go.net/files/large/17ea8760c7dc81909f032ce92d94e4f340b1585a.jpg'}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
               </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          )
        })}

        
      </ul>
    </div>
  );
}
