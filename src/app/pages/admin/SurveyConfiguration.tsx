import React, { useState } from "react";
import { Page } from "../../components/layout/Page";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";

export default function SurveyConfiguration() {
  // CSAT State
  const [csatEnabled, setCsatEnabled] = useState(true);
  const [csatTemplate, setCsatTemplate] = useState("default-template-acme");
  const [csatRanges, setCsatRanges] = useState({
    low: { label: "Low", min: 1, max: 2 },
    neutral: { label: "Neutral", min: 3, max: 4 },
    satisfied: { label: "Satisfied", min: 5, max: 5 },
  });
  const [csatCooldownSame, setCsatCooldownSame] = useState(0);
  const [csatCooldownSameUnit, setCsatCooldownSameUnit] = useState("Days");
  const [csatCooldownCross, setCsatCooldownCross] = useState(7);
  const [csatCooldownCrossUnit, setCsatCooldownCrossUnit] = useState("Days");
  const [csatAutoSend, setCsatAutoSend] = useState(false);
  const [csatDelayHours, setCsatDelayHours] = useState(900);
  const [csatFreqDays, setCsatFreqDays] = useState(30);

  // NPS State
  const [npsEnabled, setNpsEnabled] = useState(true);
  const [npsTemplate, setNpsTemplate] = useState("default-nps-template-acme");
  const [npsRanges, setNpsRanges] = useState({
    detractor: { label: "Detractor", min: 1, max: 6 },
    passive: { label: "Passive", min: 7, max: 8 },
    promoter: { label: "Promoter", min: 9, max: 10 },
  });
  const [npsCooldownSame, setNpsCooldownSame] = useState(90);
  const [npsCooldownSameUnit, setNpsCooldownSameUnit] = useState("Days");
  const [npsCooldownCross, setNpsCooldownCross] = useState(7);
  const [npsCooldownCrossUnit, setNpsCooldownCrossUnit] = useState("Days");
  const [npsAutoSend, setNpsAutoSend] = useState(false);
  const [npsFreqDays, setNpsFreqDays] = useState(180);

  const handleSaveCsat = () => {};
  const handleSaveNps = () => {};

  return (
    <Page
      title="Survey Configuration"
      subtitle="Manage CSAT and NPS settings side-by-side. Choose scale, ranges, cooldowns, automation, and templates for each type."
      crumbs={[{ label: "Admin & Settings" }]}
      showGenerateReport={false}
      showFilters={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-[1600px] mx-auto w-full">
        {/* ======================= CSAT CARD ======================= */}
        <div className="bg-card rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-foreground">CSAT Settings</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure scale, ranges, cooldowns, automation, and templates.
              </p>
            </div>
            <Button
              onClick={handleSaveCsat}
              className="h-9 px-5 bg-[#e32168] hover:bg-[#c9185a] text-white text-sm font-medium shadow-2xs shrink-0 transition-colors"
            >
              Save
            </Button>
          </div>

          <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 px-4 py-3 flex items-center gap-3">
            <Switch
              checked={csatEnabled}
              onCheckedChange={setCsatEnabled}
              className="data-[state=checked]:bg-[#10b981]"
            />
            <span className="text-sm font-semibold text-emerald-950 dark:text-emerald-200">
              CSAT Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Scale</label>
              <Input
                disabled
                value="1 - 5"
                className="h-9 bg-slate-100 dark:bg-muted text-slate-600 dark:text-slate-400 font-medium cursor-not-allowed border-slate-200 dark:border-slate-800 text-xs shadow-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Email Template</label>
              <Select value={csatTemplate} onValueChange={setCsatTemplate}>
                <SelectTrigger className="h-9 bg-background border-slate-200 dark:border-slate-800 text-xs shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default-template-acme">
                    <span>default-template-acme </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">(Default)</span>
                  </SelectItem>
                  <SelectItem value="custom-csat-v2">custom-csat-v2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-950 dark:text-rose-200">Range 1 - Low</span>
                <span className="text-rose-600 font-mono text-[11px] font-semibold">1 - 2</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Label</span>
                <Input
                  value={csatRanges.low.label}
                  onChange={(e) => setCsatRanges({ ...csatRanges, low: { ...csatRanges.low, label: e.target.value } })}
                  className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Min</span>
                  <Input
                    type="number"
                    value={csatRanges.low.min}
                    onChange={(e) => setCsatRanges({ ...csatRanges, low: { ...csatRanges.low, min: Number(e.target.value) } })}
                    className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Max</span>
                  <Input
                    type="number"
                    value={csatRanges.low.max}
                    onChange={(e) => setCsatRanges({ ...csatRanges, low: { ...csatRanges.low, max: Number(e.target.value) } })}
                    className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-950 dark:text-amber-200">Range 2 - Neutral</span>
                <span className="text-amber-600 font-mono text-[11px] font-semibold">3 - 4</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Label</span>
                <Input
                  value={csatRanges.neutral.label}
                  onChange={(e) => setCsatRanges({ ...csatRanges, neutral: { ...csatRanges.neutral, label: e.target.value } })}
                  className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Min</span>
                  <Input
                    type="number"
                    value={csatRanges.neutral.min}
                    onChange={(e) => setCsatRanges({ ...csatRanges, neutral: { ...csatRanges.neutral, min: Number(e.target.value) } })}
                    className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Max</span>
                  <Input
                    type="number"
                    value={csatRanges.neutral.max}
                    onChange={(e) => setCsatRanges({ ...csatRanges, neutral: { ...csatRanges.neutral, max: Number(e.target.value) } })}
                    className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950 dark:text-emerald-200">Range 3 - Satisfied</span>
                <span className="text-emerald-600 font-mono text-[11px] font-semibold">5 - 5</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Label</span>
                <Input
                  value={csatRanges.satisfied.label}
                  onChange={(e) => setCsatRanges({ ...csatRanges, satisfied: { ...csatRanges.satisfied, label: e.target.value } })}
                  className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Min</span>
                  <Input
                    type="number"
                    value={csatRanges.satisfied.min}
                    onChange={(e) => setCsatRanges({ ...csatRanges, satisfied: { ...csatRanges.satisfied, min: Number(e.target.value) } })}
                    className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Max</span>
                  <Input
                    type="number"
                    value={csatRanges.satisfied.max}
                    onChange={(e) => setCsatRanges({ ...csatRanges, satisfied: { ...csatRanges.satisfied, max: Number(e.target.value) } })}
                    className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-muted/20 p-4 flex flex-col gap-3">
            <span className="text-xs font-bold text-foreground">Cooldowns</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Same Type Value</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={csatCooldownSame}
                    onChange={(e) => setCsatCooldownSame(Number(e.target.value))}
                    className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs w-20 px-2"
                  />
                  <Select value={csatCooldownSameUnit} onValueChange={setCsatCooldownSameUnit}>
                    <SelectTrigger className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Days">Days</SelectItem>
                      <SelectItem value="Weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Cross Type Value</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={csatCooldownCross}
                    onChange={(e) => setCsatCooldownCross(Number(e.target.value))}
                    className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs w-20 px-2"
                  />
                  <Select value={csatCooldownCrossUnit} onValueChange={setCsatCooldownCrossUnit}>
                    <SelectTrigger className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Days">Days</SelectItem>
                      <SelectItem value="Weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-muted/10 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Switch checked={csatAutoSend} onCheckedChange={setCsatAutoSend} />
              <span className="text-xs font-bold text-foreground">Automatic Sending</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1 opacity-60">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Delay Hours</span>
                <Input disabled type="number" value={csatDelayHours} onChange={(e) => setCsatDelayHours(Number(e.target.value))} className="h-8 bg-slate-100 dark:bg-muted text-xs px-2" />
                <span className="text-[10px] text-slate-400 mt-0.5">Hours after encounter</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Frequency (Days)</span>
                <Input disabled type="number" value={csatFreqDays} onChange={(e) => setCsatFreqDays(Number(e.target.value))} className="h-8 bg-slate-100 dark:bg-muted text-xs px-2" />
                <span className="text-[10px] text-slate-400 mt-0.5">Frequency for recurring</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= NPS CARD ======================= */}
        <div className="bg-card rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-foreground">NPS Settings</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure scale, ranges, cooldowns, automation, and templates.
              </p>
            </div>
            <Button
              onClick={handleSaveNps}
              className="h-9 px-5 bg-[#e32168] hover:bg-[#c9185a] text-white text-sm font-medium shadow-2xs shrink-0 transition-colors"
            >
              Save
            </Button>
          </div>

          <div className="rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 px-4 py-3 flex items-center gap-3">
            <Switch
              checked={npsEnabled}
              onCheckedChange={setNpsEnabled}
              className="data-[state=checked]:bg-[#3b82f6]"
            />
            <span className="text-sm font-semibold text-blue-950 dark:text-blue-200">
              NPS Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Scale</label>
              <Input
                disabled
                value="1 - 10"
                className="h-9 bg-slate-100 dark:bg-muted text-slate-600 dark:text-slate-400 font-medium cursor-not-allowed border-slate-200 dark:border-slate-800 text-xs shadow-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Email Template</label>
              <Select value={npsTemplate} onValueChange={setNpsTemplate}>
                <SelectTrigger className="h-9 bg-background border-slate-200 dark:border-slate-800 text-xs shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default-nps-template-acme">
                    <span>default-nps-template-acme </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">(Default)</span>
                  </SelectItem>
                  <SelectItem value="custom-nps-v1">custom-nps-v1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-950 dark:text-rose-200">Range 1 - Detractor</span>
                <span className="text-rose-600 font-mono text-[11px] font-semibold">1 - 6</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Label</span>
                <Input value={npsRanges.detractor.label} onChange={(e) => setNpsRanges({ ...npsRanges, detractor: { ...npsRanges.detractor, label: e.target.value } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Min</span>
                  <Input type="number" value={npsRanges.detractor.min} onChange={(e) => setNpsRanges({ ...npsRanges, detractor: { ...npsRanges.detractor, min: Number(e.target.value) } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Max</span>
                  <Input type="number" value={npsRanges.detractor.max} onChange={(e) => setNpsRanges({ ...npsRanges, detractor: { ...npsRanges.detractor, max: Number(e.target.value) } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-950 dark:text-amber-200">Range 2 - Passive</span>
                <span className="text-amber-600 font-mono text-[11px] font-semibold">7 - 8</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Label</span>
                <Input value={npsRanges.passive.label} onChange={(e) => setNpsRanges({ ...npsRanges, passive: { ...npsRanges.passive, label: e.target.value } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Min</span>
                  <Input type="number" value={npsRanges.passive.min} onChange={(e) => setNpsRanges({ ...npsRanges, passive: { ...npsRanges.passive, min: Number(e.target.value) } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Max</span>
                  <Input type="number" value={npsRanges.passive.max} onChange={(e) => setNpsRanges({ ...npsRanges, passive: { ...npsRanges.passive, max: Number(e.target.value) } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950 dark:text-emerald-200">Range 3 - Promoter</span>
                <span className="text-emerald-600 font-mono text-[11px] font-semibold">9 - 10</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Label</span>
                <Input value={npsRanges.promoter.label} onChange={(e) => setNpsRanges({ ...npsRanges, promoter: { ...npsRanges.promoter, label: e.target.value } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Min</span>
                  <Input type="number" value={npsRanges.promoter.min} onChange={(e) => setNpsRanges({ ...npsRanges, promoter: { ...npsRanges.promoter, min: Number(e.target.value) } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Max</span>
                  <Input type="number" value={npsRanges.promoter.max} onChange={(e) => setNpsRanges({ ...npsRanges, promoter: { ...npsRanges.promoter, max: Number(e.target.value) } })} className="h-7 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs px-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-muted/20 p-4 flex flex-col gap-3">
            <span className="text-xs font-bold text-foreground">Cooldowns</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Same Type Value</span>
                <div className="flex items-center gap-2">
                  <Input type="number" value={npsCooldownSame} onChange={(e) => setNpsCooldownSame(Number(e.target.value))} className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs w-20 px-2" />
                  <Select value={npsCooldownSameUnit} onValueChange={setNpsCooldownSameUnit}>
                    <SelectTrigger className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs flex-1"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Days">Days</SelectItem><SelectItem value="Weeks">Weeks</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Cross Type Value</span>
                <div className="flex items-center gap-2">
                  <Input type="number" value={npsCooldownCross} onChange={(e) => setNpsCooldownCross(Number(e.target.value))} className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs w-20 px-2" />
                  <Select value={npsCooldownCrossUnit} onValueChange={setNpsCooldownCrossUnit}>
                    <SelectTrigger className="h-8 bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-xs flex-1"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Days">Days</SelectItem><SelectItem value="Weeks">Weeks</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-muted/10 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Switch checked={npsAutoSend} onCheckedChange={setNpsAutoSend} />
              <span className="text-xs font-bold text-foreground">Automatic Sending</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1 opacity-60">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Frequency (Days)</span>
                <Input disabled type="number" value={npsFreqDays} onChange={(e) => setNpsFreqDays(Number(e.target.value))} className="h-8 bg-slate-100 dark:bg-muted text-xs px-2" />
                <span className="text-[10px] text-slate-400 mt-0.5">Days between NPS sends</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
