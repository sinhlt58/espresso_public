import React from "react";
import { Rate } from "antd";
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryLegend,
  VictoryPie
} from "victory";
import moment from "moment";
import { Link } from "react-router-dom";

const CompareResult = props => (
  <div style={{ paddingLeft: 50 }}>
    <h2>
      Bình luận của khách hàng về thương hiệu{" "}
      <Link to={`/analytics/${props.brand}`}>
        <p
          style={{
            color: "red",
            fontWeight: "500",
            display: "inline"
          }}
        >
          {props.brand}
        </p>
      </Link>
    </h2>
    <span>
      <Rate
        disabled
        defaultValue={Number(props.data.rate.average)}
        allowHalf={true}
      />
      <span className="ant-rate-text">
        <h2>{props.data.totalCmt}</h2>
      </span>
    </span>
    <p>{props.data.rate.average.toFixed(2)} out of 5 stars</p>
    <VictoryPie
      data={props.starPercent}
      theme={VictoryTheme.material}
      height={200}
      style={{ labels: { fontSize: 5 } }}
      labelRadius={55}
    />
    <VictoryChart
      height={200}
      // width={300}
      domainPadding={20}
      theme={VictoryTheme.material}
    >
      <VictoryLegend
        x={50}
        y={10}
        title="Chú thích"
        centerTitle
        orientation="horizontal"
        style={{
          labels: { fontSize: 5 },
          border: { stroke: "black" },
          title: { fontSize: 5 }
        }}
        data={[
          { name: "Tích cực", symbol: { fill: "#42f47d" } },
          { name: "Tiêu cực", symbol: { fill: "#f44141" } }
        ]}
      />
      <VictoryAxis
        tickFormat={x => moment(Number(x)).format("DD/MM")}
        style={{
          axisLabel: { fontSize: 5, padding: 10 },
          tickLabels: { fontSize: 2, padding: 2 },
          ticks: { size: 1 }
        }}
        label="Ngày (DD/MM)"
        fixLabelOverlap={true}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={x => `${Math.round(x)}`}
        style={{
          axisLabel: { fontSize: 5, padding: 10 },
          tickLabels: { fontSize: 4, padding: 2 },
          ticks: { size: 1 }
        }}
        label="Số bình luận"
        fixLabelOverlap={true}
      />
      <VictoryStack>
        <VictoryBar
          style={{
            data: {
              fill: "#42f47d"
            }
          }}
          data={props.dataHistogram}
          x="timestamp"
          y={d => d.count.positive}
        />
        <VictoryBar
          style={{
            data: {
              fill: "#f44141"
            }
          }}
          data={props.dataHistogram}
          x="timestamp"
          y={d => d.count.negative}
        />
      </VictoryStack>
    </VictoryChart>
  </div>
);

export default CompareResult;
