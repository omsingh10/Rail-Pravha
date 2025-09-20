import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function UtilsDemo() {
  useEffect(() => {
    // Run the examples when the component mounts
    console.log("Running cn utility function examples:");
    console.log("Example 1:", cn("base-class", "modifier"));
    console.log("Example 2:", cn("text-red-500", { "font-bold": true, "hidden": false }));
    console.log("Example 3:", cn("p-4", "m-2", ["flex", "items-center"], { "justify-between": true }));
    console.log("Merged Tailwind classes:", cn("p-4 text-sm", "p-6 text-lg", "font-bold"));
  }, []);

  // Examples with visual output
  const example1 = cn("text-2xl font-bold", "text-blue-600");
  const example2 = cn("p-4 border rounded", { "bg-gray-100": true, "shadow-md": true });
  const example3 = cn("flex items-center", ["justify-between", "gap-4"], { "flex-col": false });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Utils.ts Demo</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">CN Utility Function Examples</h2>
          <p className="mb-2">This component demonstrates the cn utility function from utils.ts.</p>
          <p className="mb-4">Check the browser console to see the output of each example.</p>
          
          <div className="grid gap-4">
            <div className={example1}>
              Example 1: text-2xl font-bold + text-blue-600
            </div>
            
            <div className={example2}>
              Example 2: p-4 border rounded + conditional classes
            </div>
            
            <div className={example3}>
              Example 3: flex items-center + array classes + conditional classes
            </div>
          </div>
        </section>
        
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">CN Function Code</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-auto">
            {`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          </pre>
          <p className="mt-4 text-sm text-gray-600">
            The cn function combines clsx and tailwind-merge to handle conditional classes and merge conflicting Tailwind classes.
          </p>
        </section>
      </div>
    </div>
  );
}