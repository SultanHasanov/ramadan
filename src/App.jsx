import { useState, useEffect } from "react";
import { Card, Typography, Space } from "antd";
import {
  WhatsAppOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./App.css";
import { FaTelegram } from "react-icons/fa";

const { Title, Text } = Typography;

const prayerTimes = {
  "2025-03-01": { fajr: "05:20", maghrib: "17:49", isha: "19:16" },
  "2025-03-02": { fajr: "05:18", maghrib: "17:50", isha: "19:17" },
  "2025-03-03": { fajr: "05:16", maghrib: "17:51", isha: "19:19" },
  "2025-03-04": { fajr: "05:15", maghrib: "17:53", isha: "19:20" },
  "2025-03-05": { fajr: "05:13", maghrib: "17:54", isha: "19:21" },
  "2025-03-06": { fajr: "05:11", maghrib: "17:55", isha: "19:22" },
  "2025-03-07": { fajr: "05:09", maghrib: "17:56", isha: "19:24" },
  "2025-03-08": { fajr: "05:08", maghrib: "17:58", isha: "19:25" },
  "2025-03-09": { fajr: "05:06", maghrib: "17:59", isha: "19:26" },
  "2025-03-10": { fajr: "05:04", maghrib: "18:00", isha: "19:27" },
  "2025-03-11": { fajr: "05:02", maghrib: "18:01", isha: "19:28" },
  "2025-03-12": { fajr: "05:01", maghrib: "18:03", isha: "19:30" },
  "2025-03-13": { fajr: "04:59", maghrib: "18:04", isha: "19:31" },
  "2025-03-14": { fajr: "04:57", maghrib: "18:05", isha: "19:32" },
  "2025-03-15": { fajr: "04:55", maghrib: "18:06", isha: "19:33" },
  "2025-03-16": { fajr: "04:53", maghrib: "18:08", isha: "19:35" },
  "2025-03-17": { fajr: "04:51", maghrib: "18:09", isha: "19:36" },
  "2025-03-18": { fajr: "04:50", maghrib: "18:10", isha: "19:37" },
  "2025-03-19": { fajr: "04:48", maghrib: "18:11", isha: "19:38" },
  "2025-03-20": { fajr: "04:46", maghrib: "18:12", isha: "19:39" },
  "2025-03-21": { fajr: "04:44", maghrib: "18:14", isha: "19:40" },
  "2025-03-22": { fajr: "04:42", maghrib: "18:15", isha: "19:42" },
  "2025-03-23": { fajr: "04:40", maghrib: "18:16", isha: "19:43" },
  "2025-03-24": { fajr: "04:38", maghrib: "18:17", isha: "19:44" },
  "2025-03-25": { fajr: "04:36", maghrib: "18:19", isha: "19:45" },
  "2025-03-26": { fajr: "04:34", maghrib: "18:20", isha: "19:46" },
  "2025-03-27": { fajr: "04:32", maghrib: "18:21", isha: "19:48" },
  "2025-03-28": { fajr: "04:30", maghrib: "18:22", isha: "19:49" },
  "2025-03-29": { fajr: "04:28", maghrib: "18:23", isha: "19:50" },
  "2025-03-30": { fajr: "04:26", maghrib: "18:25", isha: "19:51" },
  "2025-03-31": { fajr: "04:24", maghrib: "18:26", isha: "19:52" },
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
  const fajrTime = prayerTimes[today]?.fajr || "05:30";
  const maghribTime = prayerTimes[today]?.maghrib || "18:00";
  const ishaTime = prayerTimes[today]?.isha || "19:30";

  const [timeLeftFajr, setTimeLeftFajr] = useState(getTimeLeft(fajrTime));
  const [timeLeftMaghrib, setTimeLeftMaghrib] = useState(
    getTimeLeft(maghribTime)
  );
  const [timeLeftIsha, setTimeLeftIsha] = useState(getTimeLeft(ishaTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftFajr(getTimeLeft(fajrTime));
      setTimeLeftMaghrib(getTimeLeft(maghribTime));
      setTimeLeftIsha(getTimeLeft(ishaTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [fajrTime, maghribTime, ishaTime]);

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
        <Card className="card">
          <Title level={3}>Время до Фаджр-намаза</Title>
          <Text className="time">{timeLeftFajr}</Text>
          <br />
          <Text type="secondary">Время Фаджр-намаза: {fajrTime}</Text>
        </Card>
        <Card className="card">
      <div className="social-icons">
        <a
          href="https://wa.me/79667283100"
          target="_blank"
          rel="noopener noreferrer"
          >
          <WhatsAppOutlined
            style={{ fontSize: "42px", color: "#25D366", margin: "10px" }}
            />
        </a>
        <a
          href="https://t.me/sult987"
          target="_blank"
          rel="noopener noreferrer"
          >
          <FaTelegram 
            style={{ fontSize: "42px", color: "#0088cc", margin: "10px" }}
            />
        </a>
        <a
          href="https://instagram.com/sult_dev"
          target="_blank"
          rel="noopener noreferrer"
          >
          <InstagramOutlined
            style={{ fontSize: "42px", color: "#E4405F", margin: "10px" }}
            />
        </a>
      </div>
            <h2 style={{  color: "green", margin: "0px" }}>Отец основатель</h2>
        </Card>
      </Space>
      
    </div>
  );
}

export default App;
