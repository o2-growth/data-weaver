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
        <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.6} />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          tickCount={6}
        />
        <Radar
          name="Maturidade"
          dataKey="score"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value: number) => [value.toFixed(2), "Nota"]}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "10px",
            color: "hsl(var(--card-foreground))",
            fontSize: "12px",
            fontWeight: 500,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
