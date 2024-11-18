import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <Card className={`${color} text-white`}>
      <CardContent className="p-6">
        <div className="w-6 h-6 mb-4">{icon}</div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </CardContent>
    </Card>
  );
}
