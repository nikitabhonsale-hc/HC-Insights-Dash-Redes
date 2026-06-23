import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { BriefcaseMedical, Network } from "lucide-react";
import { cn } from "../../../components/ui/utils";

import { Input } from "../../../components/ui/input";

export interface OrganizationDetailsStepProps {
  selectedType: "dpc" | "network" | null;
  onTypeChange: (type: "dpc" | "network" | null) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function OrganizationDetailsStep({ selectedType, onTypeChange, onNext, onPrev }: OrganizationDetailsStepProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    address: "",
    zip: "",
    city: "San Francisco",
    state: "CA"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    if (!isExpanded) return true;
    
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = `${selectedType === "dpc" ? "Practice" : "Network"} name is required`;
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.zip.trim() || formData.zip.trim().length < 5) newErrors.zip = "Valid ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      if (validate()) {
        onNext();
      }
    }
  };

  const handlePrevClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      onPrev();
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Organization Details
        </h2>
        <div className="mt-4 w-full border-t border-slate-200" />
      </div>

      <div className="mb-8 flex flex-col gap-4">
        <label className="text-[15px] font-semibold text-slate-800">
          Which best describes your organization? <span className="text-primary">*</span>
        </label>
        
        <div className="grid grid-cols-2 gap-4" style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1)" }}>
          <button
            onClick={() => onTypeChange("dpc")}
            className={cn(
              "flex items-center justify-center gap-3 rounded-lg border-2",
              isExpanded ? "flex-row p-3 text-left" : "flex-col p-6 text-center",
              selectedType === "dpc"
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
            )}
            style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1), background-color 150ms ease-out, border-color 150ms ease-out" }}
          >
            <BriefcaseMedical
              className={cn(
                isExpanded ? "size-6" : "size-10",
                selectedType === "dpc" ? "text-primary" : "text-slate-700"
              )}
              strokeWidth={2}
              style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1), color 150ms ease-out" }}
            />
            <div 
              className={cn("flex flex-col", isExpanded ? "gap-0 items-start" : "gap-1 items-center")}
              style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1)" }}
            >
              <span 
                className={cn("font-bold text-slate-800", isExpanded && "text-sm")}
                style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1), font-size 150ms ease-out" }}
              >
                DPC (Direct Primary Care)
              </span>
              {!isExpanded && (
                <span className="text-xs text-slate-500 animate-in fade-in zoom-in duration-300">
                  For individual or group medical practices
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => onTypeChange("network")}
            className={cn(
              "flex items-center justify-center gap-3 rounded-lg border-2",
              isExpanded ? "flex-row p-3 text-left" : "flex-col p-6 text-center",
              selectedType === "network"
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
            )}
            style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1), background-color 150ms ease-out, border-color 150ms ease-out" }}
          >
            <Network
              className={cn(
                isExpanded ? "size-6" : "size-10",
                selectedType === "network" ? "text-primary" : "text-slate-700"
              )}
              strokeWidth={2}
              style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1), color 150ms ease-out" }}
            />
            <div 
              className={cn("flex flex-col", isExpanded ? "gap-0 items-start" : "gap-1 items-center")}
              style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1)" }}
            >
              <span 
                className={cn("font-bold text-slate-800", isExpanded && "text-sm")}
                style={{ transition: "all 400ms cubic-bezier(0.35, 1.55, 0.65, 1), font-size 150ms ease-out" }}
              >
                Network
              </span>
              {!isExpanded && (
                <span className="text-xs text-slate-500 animate-in fade-in zoom-in duration-300">
                  For healthcare organizations with multiple practices
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {isExpanded && selectedType && (
        <div className="flex flex-col gap-6 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              {selectedType === "dpc" ? "Practice Name" : "Network Name"} <span className="text-primary">*</span>
            </label>
            <Input 
              placeholder={`Enter ${selectedType === "dpc" ? "practice" : "network"} name`} 
              className={cn("h-11", errors.name && "border-red-500 focus-visible:ring-red-500")}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Website
            </label>
            <Input 
              placeholder="Enter website URL" 
              className="h-11"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Address <span className="text-primary">*</span>
            </label>
            <Input 
              placeholder="Enter address" 
              className={cn("h-11", errors.address && "border-red-500 focus-visible:ring-red-500")}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              ZIP Code <span className="text-primary">*</span>
            </label>
            <Input 
              placeholder="Enter ZIP code" 
              className={cn("h-11", errors.zip && "border-red-500 focus-visible:ring-red-500")}
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
            {errors.zip && <span className="text-xs text-red-500">{errors.zip}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-800">
                City
              </label>
              <Input 
                placeholder="Auto-filled from ZIP" 
                disabled 
                value={formData.zip.length >= 5 ? formData.city : ""}
                className="h-11 bg-slate-200/50 cursor-not-allowed placeholder:text-slate-500" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-800">
                State
              </label>
              <Input 
                placeholder="Auto-filled from ZIP" 
                disabled 
                value={formData.zip.length >= 5 ? formData.state : ""}
                className="h-11 bg-slate-200/50 cursor-not-allowed placeholder:text-slate-500" 
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full gap-4 mt-auto">
        <Button
          variant="outline"
          onClick={handlePrevClick}
          className="flex-1 rounded-md border-primary text-primary hover:bg-primary/5 hover:text-primary py-6 text-base font-semibold"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextClick}
          disabled={!selectedType}
          className="flex-[2] rounded-md py-6 text-base font-semibold"
        >
          {isExpanded && selectedType === "network" ? "Create" : "Next"}
        </Button>
      </div>
    </div>
  );
}
