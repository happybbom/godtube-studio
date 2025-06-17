import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  iconColor: string;
}

export function MetricsCard({ title, value, change, changeType, icon: Icon, iconColor }: MetricsCardProps) {
  return (
    <Card className="bg-replit-card border-slate-600 hover:border-slate-500 transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
            <Icon className="text-white" size={20} />
          </div>
          <span className={`text-xs font-medium ${
            changeType === "positive" ? "text-replit-green" : "text-red-400"
          }`}>
            {change}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
      </CardContent>
    </Card>
  );
}
