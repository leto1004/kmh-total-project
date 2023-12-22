import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  min-width: 500px;
  max-width: 900px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 30px auto;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 0px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GenderChart = () => {
  // 차트 데이터
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  // 지역명
  const [region, setRegion] = useState("신도림");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rsp = await AxiosApi.genderChart(region);
        if (rsp.status === 200) {
          setChartData({
            labels: Array.from(
              { length: rsp.data.female.length },
              (_, i) => i + 1
            ),
            datasets: [
              {
                label: "여성",
                data: rsp.data.female,
                backgroundColor: "rgba(255, 99, 132, 0.8)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "남성",
                data: rsp.data.male,
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
      },
      y: {
        type: "linear",
      },
    },
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value); // 지역명 상태 업데이트 함수
  };
  const handleRegionClick = async () => {
    try {
      const rsp = await AxiosApi.genderChart(region);
      if (rsp.status === 200) {
        setChartData({
          labels: Array.from(
            { length: rsp.data.female.length },
            (_, i) => i + 1
          ),
          datasets: [
            {
              label: "여성",
              data: rsp.data.female,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "남성",
              data: rsp.data.male,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          value={region}
          onChange={handleRegionChange}
          placeholder="지역명 입력"
        />
        <Button onClick={handleRegionClick}>조회</Button>
      </InputContainer>
      <h2>{region} 지역의 남여 성별 인구 분포(2019년 기준)</h2>
      <Bar data={chartData} options={options} />
    </Container>
  );
};

export default GenderChart;