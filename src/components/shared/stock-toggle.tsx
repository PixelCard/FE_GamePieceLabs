"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { X } from "lucide-react";

export default function StockToggle() {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <>
      <div className="inline-flex">
        <Label htmlFor="terms" className="text-base font-bold px-2">
          In atock only
        </Label>
        <span>
          <Switch
            id="stock-only-switch"
            className="mt-2"
            onCheckedChange={(v) => setIsToggled(v)}
            checked={isToggled}
          />
        </span>
      </div>

      {isToggled && (
        <>
          <div>
            <Badge className="mt-2 py-6 px-6 bg-gray-200 border-none text-black text-md">
              In Stock
              <X
                className="cursor-pointer"
                onClick={() => setIsToggled(false)}
              />
            </Badge>
          </div>
        </>
      )}
    </>
  );
}
