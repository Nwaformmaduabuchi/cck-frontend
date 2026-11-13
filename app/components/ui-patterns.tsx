import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn, } from "@/lib/utils";

export const labelClass =
  "mb-2 block text-sm font-medium text-foreground";

// text-base on mobile prevents iOS Safari from auto-zooming on focus (inputs under 16px trigger it);
// sm:text-sm keeps the original compact density on larger screens. h-11 gives a ~44px tap target on
// mobile, stepping back down to h-10 from sm: up, matching the original desktop sizing.
export const inputClass =
  "h-11 sm:h-10 rounded-lg border-none bg-background py-2 px-3 text-base sm:text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-60 border border-border shadow-sm w-full";

export const numberInputClass = cn(inputClass, "no-spinner");

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg py-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-2 sm:py-4 lg:px-6">
      <div>
        <h1 className="font-heading text-xl font-semibold sm:text-2xl lg:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-primary-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-col flex-start sm:flex-row flex-wrap gap-2 sm:ml-auto mt-auto">{actions}</div>}
    </div>
  );
}

export function Surface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        className
      )}
    >
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "bg-accent text-accent-foreground shadow-sm",
    success: "bg-emerald-100 text-emerald-700 shadow-sm",
    warning: "bg-amber-100 text-amber-700 shadow-sm",
    danger: "bg-rose-50 text-rose-700 shadow-sm",
  }[tone];

  return (
    <div className={cn("rounded-lg flex flex-col gap-2 items-center p-4 w-[clamp(.5rem_2.5vw_.75rem)] border border-border shadow-sm", toneClass)}>
      <div className="flex flex-col items-center justify-between gap-3">
        {Icon && (
          <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-12 p-2", toneClass)}>
            <Icon className="size-12" />
          </span>
        )}
        <p className="text-sm text-muted-foreground sm:text-lg font-semibold text-wrap">{label}</p>
      </div>
      <p className="text-xs font-medium xl:font-semibold text-foreground sm:text-xl  xl:text-2xl">{value}</p>
    </div>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const toneClass = {
    neutral: "bg-secondary text-secondary-foreground",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    warning: "bg-amber-50 text-amber-700 ring-amber-600/15",
    danger: "bg-rose-50 text-rose-700 ring-rose-600/15",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        toneClass
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card px-4 py-8 text-center sm:px-6 sm:py-10">
      {Icon && (
        <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
          <Icon className="size-5" />
        </div>
      )}
      <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}