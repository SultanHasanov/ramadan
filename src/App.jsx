import { useState, useEffect } from "react";
import { Card, Typography, Space } from "antd";
import dayjs from "dayjs";
import "./App.css";

const { Title, Text } = Typography;

const prayerTimes = {
  "2025-03-01": { maghrib: "17:48", isha: "19:18" },
  "2025-03-02": { maghrib: "17:50", isha: "19:19" },
  "2025-03-03": { maghrib: "17:51", isha: "19:20" },
  "2025-03-04": { maghrib: "17:52", isha: "19:21" },
  "2025-03-05": { maghrib: "17:54", isha: "19:23" },
  "2025-03-06": { maghrib: "17:55", isha: "19:24" },
  "2025-03-07": { maghrib: "17:56", isha: "19:25" },
  "2025-03-08": { maghrib: "17:57", isha: "19:26" },
  "2025-03-09": { maghrib: "17:58", isha: "19:28" },
  "2025-03-10": { maghrib: "18:00", isha: "19:29" },
};

function getTimeLeft(targetTime) {
  const now = dayjs();
  const target = dayjs(`${dayjs().format("YYYY-MM-DD")} ${targetTime}`);
  const diff = target.diff(now, "second");

  if (diff > 0) {
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours}ч ${minutes}м ${seconds}с`;
  }
  return "Время намаза наступило";
}

function App() {
  const today = dayjs().format("YYYY-MM-DD");
  const maghribTime = prayerTimes[today]?.maghrib || "18:00";
  const ishaTime = prayerTimes[today]?.isha || "19:30";

  const [timeLeftMaghrib, setTimeLeftMaghrib] = useState(
    getTimeLeft(maghribTime)
  );
  const [timeLeftIsha, setTimeLeftIsha] = useState(getTimeLeft(ishaTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftMaghrib(getTimeLeft(maghribTime));
      setTimeLeftIsha(getTimeLeft(ishaTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [maghribTime, ishaTime]);

  return (
    <div className="container">
      <Space direction="vertical" size={20}>
        <Card className="card">
          <Title level={3}>Время до Магриб-намаза</Title>
          <Text className="time">{timeLeftMaghrib}</Text>
          <br />
          <Text type="secondary">Время Магриб-намаза: {maghribTime}</Text>
        </Card>
        <Card className="card">
          <Title level={3}>Время до Иша-намаза</Title>
          <Text className="time">{timeLeftIsha}</Text>
          <br />
          <Text type="secondary">Время Иша-намаза: {ishaTime}</Text>
        </Card>
      </Space>
    </div>
  );
}

export default App;
