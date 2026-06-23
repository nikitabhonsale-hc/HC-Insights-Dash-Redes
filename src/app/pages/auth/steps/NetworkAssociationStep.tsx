import { useState, useRef, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../components/ui/utils";

const MOCK_NETWORKS = [
  "Aetna Health Network",
  "UnitedHealthcare Partners",
  "Cigna Healthcare",
  "Blue Cross Blue Shield",
  "Kaiser Permanente",
  "Humana Networks",
  "Anthem Blue Cross",
  "Centene Corporation",
  "Molina Healthcare",
  "Ascension Health",
  "Trinity Health",
  "CommonSpirit Health",
  "Providence Health",
  "Mount Sinai Health System",
  "Mayo Clinic Care Network",
  "Cleveland Clinic Network",
  "Johns Hopkins Medicine"
];

function NetworkAutocomplete({ 
  value, 
  onChange,
  onOpenChange 
}: { 
  value: string; 
  onChange: (val: string) => void;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal state to parent
  useEffect(() => {
    onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  const filtered = inputValue.length >= 4 
    ? MOCK_NETWORKS.filter(n => n.toLowerCase().includes(inputValue.toLowerCase()))
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Revert to selected value if they clicked away without choosing
        if (value !== inputValue) {
           setInputValue(value);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, inputValue]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        placeholder="Type at least 4 characters to search..."
        className="h-11 bg-white"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value.length >= 4) setIsOpen(true);
          else setIsOpen(false);
          
          if (value) onChange(""); 
        }}
        onFocus={() => {
          if (inputValue.length >= 4) setIsOpen(true);
        }}
      />
      {isOpen && inputValue.length >= 4 && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {filtered.length > 0 ? (
            <div className="py-1">
              {filtered.map((network) => (
                <div
                  key={network}
                  className="px-4 py-2.5 text-sm hover:bg-slate-50 cursor-pointer text-slate-700 transition-colors"
                  onClick={() => {
                    setInputValue(network);
                    onChange(network);
                    setIsOpen(false);
                  }}
                >
                  {network}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1.5 px-4 py-5 text-sm">
              <span className="text-slate-500 text-center">
                No onboarded networks found matching "{inputValue}"
              </span>
              <button 
                type="button"
                className="text-[13px] font-semibold text-primary hover:underline transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/support', '_blank');
                }}
              >
                Get Support?
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface NetworkAssociationStepProps {
  onNext: () => void;
  onPrev: () => void;
}

export function NetworkAssociationStep({ onNext, onPrev }: NetworkAssociationStepProps) {
  const [isAffiliated, setIsAffiliated] = useState(true);
  const [networkName, setNetworkName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const canProceed = !isAffiliated || (isAffiliated && networkName.length > 0);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out h-full">
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Network Association
        </h2>
        <div className="mt-4 w-full border-t border-slate-200" />
      </div>

      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-semibold text-slate-800">
            Is your practice affiliated with a network? <span className="text-primary">*</span>
          </label>
          
          <div className="relative inline-flex h-[42px] items-center rounded-full border border-slate-300 bg-slate-200/50 p-1 w-max">
            {/* Sliding Pill Background */}
            <div 
              className={cn(
                "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isAffiliated ? "left-1 bg-primary shadow-sm" : "left-1/2 bg-white shadow-sm"
              )}
            />
            <button
              onClick={() => setIsAffiliated(true)}
              className={cn(
                "relative z-10 px-8 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300",
                isAffiliated ? "text-white" : "text-slate-600 hover:text-slate-800"
              )}
            >
              Yes
            </button>
            <button
              onClick={() => setIsAffiliated(false)}
              className={cn(
                "relative z-10 px-8 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300",
                !isAffiliated ? "text-slate-800" : "text-slate-600 hover:text-slate-800"
              )}
            >
              No
            </button>
          </div>
        </div>

        <div 
          className="grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ 
            gridTemplateRows: isAffiliated ? "1fr" : "0fr", 
            opacity: isAffiliated ? 1 : 0,
            marginTop: isAffiliated ? "0.5rem" : "0"
          }}
        >
          <div className={cn("px-2 -mx-2 pt-1 -mt-1", !isDropdownOpen && "overflow-hidden")}>
            <div className="flex flex-col gap-1.5 pb-2">
              <label className="text-[15px] font-semibold text-slate-800">
                Network Name <span className="text-primary">*</span>
              </label>
              <NetworkAutocomplete 
                value={networkName} 
                onChange={setNetworkName} 
                onOpenChange={setIsDropdownOpen}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-4 mt-auto">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex-1 rounded-md border-primary text-primary hover:bg-primary/5 hover:text-primary py-6 text-base font-semibold"
        >
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          className="flex-[2] rounded-md py-6 text-base font-semibold"
        >
          Create
        </Button>
      </div>
    </div>
  );
}
