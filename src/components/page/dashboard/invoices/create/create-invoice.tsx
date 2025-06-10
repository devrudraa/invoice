"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";

export default function CreateInvoice() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Card className="max-w-4xl w-full mx-auto">
      <CardContent className="p-5">
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-4 w-fit items-center">
            <Badge variant={"secondary"}>Draft</Badge>
            <Input placeholder="Test 123" />
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label>Invoice No.</Label>
            <Input icon={"#"} placeholder="INV-001" />
          </div>

          <div>
            <Label>Currency</Label>
            <Select defaultValue="INR">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>From</Label>
            <div className="space-y-2">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Your Address" />
            </div>
          </div>

          <div>
            <Label>To</Label>
            <div className="space-y-2">
              <Input placeholder="Client Name" />
              <Input placeholder="Client Email" />
              <Input placeholder="Client Address" />
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="date">Date</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                id="date"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-start"
                )}
              >
                <>
                  <CalendarIcon />
                  {date ? date.toLocaleDateString() : "Select a date"}
                </>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                  startMonth={new Date()}
                  hidden={[{ before: new Date() }]}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Due Date</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Due Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receipt">Due on receipt</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="my-5" />

        <div>
          <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
            <p className="col-span-6">Description</p>
            <p className="col-span-2">Quantity</p>
            <p className="col-span-2">Rate</p>
            <p className="col-span-2">Amount</p>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6">
              <Textarea
                className="min-h-[40px]"
                rows={1}
                placeholder="Item name & Description"
              />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" disabled />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="flex flex-col gap-2 w-1/3">
            <div className="flex justify-between font-medium py-2">
              <span>Subtotal</span>
              <span>$200</span>
            </div>
            <div className="flex justify-between font-medium py-2 border-t">
              <span>Total (USD)</span>
              <span>$200</span>
            </div>
          </div>
        </div>

        <Separator className="my-5" />
        <div>
          <Label className="mt-4">Notes</Label>
          <Textarea
            placeholder="Add any additional notes or terms here"
            className="mt-2"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button>Send Invoice</Button>
        </div>
      </CardContent>
    </Card>
  );
}
