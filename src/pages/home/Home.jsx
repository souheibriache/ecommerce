import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo , useState , useEffect} from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setuserStats] = useState([])
  const MONTHS = useMemo(
    ()=> [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ] , [])

    useEffect(() => {
      const getStats = async () => {
        try{
          const res = await userRequest('users/stats');
          res.data.map(item => {
            setuserStats(prev => [...prev , {name : MONTHS[item._id -1] , 'Active User' : item.total}])
          })
        }catch(e){
          console.log(e)
        }
      }
      getStats()
    }, [MONTHS])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
