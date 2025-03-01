import { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

// Данные времени Магриб-намаза для Грозного на март (пример)
const prayerTimes = {
  "2025-03-01": "17:48",
  "2025-03-02": "17:50",
  "2025-03-03": "17:51",
  "2025-03-04": "17:52",
  "2025-03-05": "17:54",
  "2025-03-06": "17:55",
  "2025-03-07": "17:56",
  "2025-03-08": "17:57",
  "2025-03-09": "17:58",
  "2025-03-10": "18:00",
  "2025-03-11": "18:01",
  "2025-03-12": "18:02",
  "2025-03-13": "18:03",
  "2025-03-14": "18:04",
  "2025-03-15": "18:05",
  "2025-03-16": "18:06",
  "2025-03-17": "18:07",
  "2025-03-18": "18:08",
  "2025-03-19": "18:09",
  "2025-03-20": "18:10",
  "2025-03-21": "18:11",
  "2025-03-22": "18:12",
  "2025-03-23": "18:13",
  "2025-03-24": "18:14",
  "2025-03-25": "18:15",
  "2025-03-26": "18:16",
  "2025-03-27": "18:17",
  "2025-03-28": "18:18",
  "2025-03-29": "18:19",
  "2025-03-30": "18:20",
  "2025-03-31": "18:21"
};

function App() {
  const [timeLeft, setTimeLeft] = useState("");
  const today = dayjs().format("YYYY-MM-DD");
  const maghribTime = prayerTimes[today] || "18:00"; // Если нет данных, берем 18:00
  const maghribDateTime = dayjs(`${today} ${maghribTime}`);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = maghribDateTime.diff(now, "second");

      if (diff > 0) {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
      } else {
        setTimeLeft("Время Магриб-намаза наступило");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [maghribDateTime]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
      <Card style={{ width: 400, textAlign: "center", background: "#fff", borderRadius: 8 }}>
        <Title level={3}>Оставшееся время до Магриб-намаза</Title>
        <Text strong style={{ fontSize: 24, color: "#1890ff" }}>{timeLeft}</Text>
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">Время Магриб-намаза: {maghribTime}</Text>
        </div>
      </Card>
    </div>
  );
}

export default App;
