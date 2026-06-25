import { Skeleton } from "../ui/skeleton";
import { cn } from "../ui/utils";

/* ------------------------------------------------------------------ */
/*  KPI Card Skeleton                                                 */
/* ------------------------------------------------------------------ */
export function KpiCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-transparent bg-card p-6 shadow-sm space-y-3",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-3.5 w-28 rounded" />
        </div>
        <Skeleton className="size-3.5 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24 rounded" />
      <Skeleton className="h-3 w-36 rounded" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chart / Panel Skeleton                                            */
/* ------------------------------------------------------------------ */
export function ChartSkeleton({
  height = 300,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-transparent bg-card p-6 shadow-sm space-y-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-3 w-56 rounded" />
        </div>
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
      <Skeleton className="w-full rounded-lg" style={{ height }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Panel Skeleton (generic titled card)                              */
/* ------------------------------------------------------------------ */
export function PanelSkeleton({
  height = 200,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-transparent bg-card p-6 shadow-sm space-y-4",
        className,
      )}
    >
      <Skeleton className="h-4 w-48 rounded" />
      <Skeleton className="w-full rounded-lg" style={{ height }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table Skeleton                                                    */
/* ------------------------------------------------------------------ */
export function TableSkeleton({
  rows = 5,
  cols = 5,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-transparent bg-card shadow-sm overflow-hidden",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 bg-muted px-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 rounded flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="flex items-center gap-4 border-t border-border/60 px-4 py-3"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className="h-3.5 rounded flex-1"
              style={{ opacity: 1 - r * 0.12 }}
            />
          ))}
        </div>
      ))}
      {/* Pagination bar */}
      <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2.5">
        <Skeleton className="h-3 w-36 rounded" />
        <div className="flex gap-1.5">
          <Skeleton className="size-7 rounded" />
          <Skeleton className="size-7 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Activity List Skeleton                                            */
/* ------------------------------------------------------------------ */
export function ActivityListSkeleton({
  items = 6,
  className,
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-transparent bg-card shadow-sm overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/50 p-6">
        <Skeleton className="h-4 w-36 rounded" />
        <Skeleton className="h-7 w-16 rounded" />
      </div>
      <div className="flex flex-col">
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-4 px-6 py-4",
              i < items - 1 && "border-b border-border/50",
            )}
          >
            <Skeleton className="size-[38px] rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pie Chart Skeleton                                                */
/* ------------------------------------------------------------------ */
export function PieChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-transparent bg-card p-6 shadow-sm flex flex-col items-center gap-6",
        className,
      )}
    >
      <div className="self-start space-y-1.5 w-full">
        <Skeleton className="h-4 w-44 rounded" />
        <Skeleton className="h-3 w-64 rounded" />
      </div>
      <Skeleton className="size-[200px] rounded-full" />
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Skeleton className="size-2.5 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Action Card Skeleton (Home page)                            */
/* ------------------------------------------------------------------ */
export function QuickActionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-transparent bg-card p-4 shadow-sm space-y-3",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-3/4 rounded" />
        <Skeleton className="h-3 w-full rounded" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI Sparkline Card Skeleton (Home page)                           */
/* ------------------------------------------------------------------ */
export function KpiSparklineSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-transparent bg-card p-6 shadow-sm h-[240px] flex flex-col",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="size-8 rounded-full" />
      </div>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-8 w-20 rounded" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
      <Skeleton className="flex-1 w-full rounded-lg" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Heat Table Skeleton                                               */
/* ------------------------------------------------------------------ */
export function HeatTableSkeleton({
  rows = 5,
  cols = 10,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <div className="flex gap-0">
        <Skeleton className="h-9 w-[220px] rounded-none" />
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-9 flex-1 rounded-none" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-0 border-t border-border/60">
          <Skeleton
            className="h-9 w-[220px] rounded-none"
            style={{ opacity: 0.7 }}
          />
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className="h-9 flex-1 rounded-none"
              style={{ opacity: 0.3 + Math.random() * 0.4 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
