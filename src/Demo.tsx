import { cn } from "./lib/utils";

// Simple demo component to test cn utility
function Demo() {
  // Test examples of the cn function
  console.log("Example 1:", cn("base-class", "modifier"));
  console.log("Example 2:", cn("text-red-500", { "font-bold": true, "hidden": false }));
  console.log("Example 3:", cn("p-4", "m-2", ["flex", "items-center"], { "justify-between": true }));
  console.log("Merged classes:", cn("p-4 text-sm", "p-6 text-lg", "font-bold"));
  
  const testClass = cn(
    "base-class",
    { "conditional-class": true }
  );
  
  return (
    <div className={testClass}>
      Testing the cn utility function
    </div>
  );
}

export default Demo;