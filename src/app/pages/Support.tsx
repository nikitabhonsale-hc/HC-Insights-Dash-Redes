import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

export default function SupportPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-slate-200 shadow-xl">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-800">Request Submitted</CardTitle>
            <CardDescription className="text-base mt-2">
              We've received your support request successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Our support team will review your details and reach out to the email provided shortly. You can safely close this window.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full py-6 text-base font-semibold transition-transform duration-150 active:scale-[0.97]" onClick={() => window.close()}>
              Close Window
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 text-center mb-2">
          Health<span className="text-primary">Compiler</span> Support
        </h1>
        <p className="text-slate-500 text-center mb-8">
          Submit a ticket and our team will help you get sorted.
        </p>
        
        <Card className="shadow-xl border-slate-200">
          <CardHeader className="border-b border-slate-100 pb-6 mb-6">
            <CardTitle className="text-xl font-bold text-slate-800">New Support Request</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us resolve your issue quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="support-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="issue-type" className="font-semibold text-slate-700">
                  Type of Issue <span className="text-primary">*</span>
                </Label>
                <Select required>
                  <SelectTrigger id="issue-type" className="h-11 bg-slate-100 text-slate-900">
                    <SelectValue placeholder="Select the type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="missing-network">My network is not on the list</SelectItem>
                    <SelectItem value="login-issue">Login or Authentication Issue</SelectItem>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                    <SelectItem value="other">Other Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="person-name" className="font-semibold text-slate-700">
                    Your Name <span className="text-primary">*</span>
                  </Label>
                  <Input id="person-name" required placeholder="John Doe" className="h-11 bg-slate-100 placeholder:text-slate-500 text-slate-900" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="font-semibold text-slate-700">
                    Email Address <span className="text-primary">*</span>
                  </Label>
                  <Input id="email" type="email" required placeholder="john@example.com" className="h-11 bg-slate-100 placeholder:text-slate-500 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="network-name" className="font-semibold text-slate-700">
                    Name of Network <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                  </Label>
                  <Input id="network-name" placeholder="Enter network name" className="h-11 bg-slate-100 placeholder:text-slate-500 text-slate-900" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="practice-name" className="font-semibold text-slate-700">
                    Name of Practice <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                  </Label>
                  <Input id="practice-name" placeholder="Enter practice name" className="h-11 bg-slate-100 placeholder:text-slate-500 text-slate-900" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="details" className="font-semibold text-slate-700">Additional Details</Label>
                <textarea 
                  id="details" 
                  rows={4} 
                  className="flex w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm shadow-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Please describe your issue in detail..." 
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 bg-slate-50/50 pt-6 mt-2 rounded-b-xl">
            <Button variant="outline" type="button" onClick={() => window.close()} className="h-12 px-6 font-semibold hover:bg-slate-100 hover:text-slate-900 transition-transform duration-150 active:scale-[0.97]">
              Cancel
            </Button>
            <Button type="submit" form="support-form" className="h-12 px-8 font-semibold transition-transform duration-150 active:scale-[0.97]">
              Submit Request
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
