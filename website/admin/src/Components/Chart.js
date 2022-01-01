import Chart from "react-google-charts";
import Axios from "axios";
import { useEffect, useState } from "react";

export default function GoogleChart() {
  const [chartDay, setChartDay] = useState([]);
  const getChartDay = () => {
    Axios.get("http://localhost:3001/admin/dashboard/chart-day").then((res) => {
      let chart = ["Thời gian"];
      let data = res.data;
      for (let i = 0; i < 24; i++) {
        chart.push(0);
      }
      for (let i = 0; i < data.length; i++) {
        chart.splice(25 - data[i]["time"], 1, data[i]["total"]);
      }
      setChartDay(chart);
    });
  };

  useEffect(() => {
    getChartDay();
  }, []);

  console.log(chartDay);

  return (
    <section>
      <div className="row mb-4">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 pe-2">
          <div className="p-4 bg-white border rounded">
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="Bar"
              loader={<div>Đang tải dữ liệu</div>}
              data={[
                [
                  "",
                  "23 giờ trước",
                  "22 giờ trước",
                  "21 giờ trước",
                  "20 giờ trước",
                  "19 giờ trước",
                  "18 giờ trước",
                  "17 giờ trước",
                  "16 giờ trước",
                  "15 giờ trước",
                  "14 giờ trước",
                  "13 giờ trước",
                  "12 giờ trước",
                  "11 giờ trước",
                  "10 giờ trước",
                  "9 giờ trước",
                  "8 giờ trước",
                  "7 giờ trước",
                  "6 giờ trước",
                  "5 giờ trước",
                  "4 giờ trước",
                  "3 giờ trước",
                  "2 giờ trước",
                  "1 giờ trước",
                  "Bây giờ",
                ],
                [
                  "Thời gian",
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  2,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  2,
                ],
              ]}
              options={{
                chart: {
                  title: "Số đơn hàng",
                  subtitle: "Trong 24 giờ qua",
                },
                colors: [
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#5891f0",
                  "#8db8ff",
                ],
                legend: {
                  position: "none",
                },
                animation: {
                  startup: true,
                  easing: "linear",
                  duration: 1500,
                },
              }}
              // For tests
              rootProps={{ "data-testid": "2" }}
            />
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 ps-2">
          <div className="p-4 bg-white border rounded">
            <Chart
              width={"100%"}
              height={"400px"}
              chartType="Bar"
              loader={<div>Đang tải dữ liệu</div>}
              data={[
                ["Tuần", "Tháng trước", "Tháng này"],
                ["Tuần 4", 0, 0],
                ["Tuần 3", 0, 0],
                ["Tuần 2", 1, 5],
                ["Tuần 1", 2, 7],
              ]}
              options={{
                chart: {
                  title: "So sánh số đơn hàng",
                  subtitle: "Trong 28 ngày qua",
                },
                colors: ["#6c35c7", "#355bc7"],
                animation: {
                  startup: true,
                  easing: "linear",
                  duration: 1500,
                },
                enableInteractivity: false,
              }}
              // For tests
              rootProps={{ "data-testid": "2" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
