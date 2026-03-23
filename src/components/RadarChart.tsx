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
        <PolarGrid stroke="hsl(220, 13%, 90%)" />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 11 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 10 }}
          tickCount={6}
        />
        <Radar
          name="Maturidade"
          dataKey="score"
          stroke="hsl(217, 91%, 50%)"
          fill="hsl(217, 91%, 50%)"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value: number) => [value.toFixed(2), "Nota"]}
          contentStyle={{
            backgroundColor: "hsl(222, 25%, 12%)",
            border: "1px solid hsl(220, 20%, 18%)",
            borderRadius: "8px",
            color: "hsl(210, 40%, 95%)",
          }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
