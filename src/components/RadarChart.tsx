import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarChartProps {
  data: { name: string; score: number; fullMark: number }[];
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "#A0A0A0", fontSize: 11, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fill: "#606060", fontSize: 10 }}
          tickCount={6}
        />
        <Radar
          name="Maturidade"
          dataKey="score"
          stroke="#00E676"
          fill="#00E676"
          fillOpacity={0.18}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value: number) => [value.toFixed(2), "Nota"]}
          contentStyle={{
            backgroundColor: "rgba(13,13,13,0.95)",
            border: "1px solid rgba(126,191,142,0.3)",
            borderRadius: "12px",
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: 500,
            backdropFilter: "blur(8px)",
          }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
