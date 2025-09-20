// Demo script for cn function
import { cn } from "./lib/utils";

// Add TypeScript declaration for our custom window property
declare global {
  interface Window {
    cnExamples: string[];
  }
}

// Run these examples in the browser console
const examples = [
  cn("base-class", "modifier"),
  cn("text-red-500", { "font-bold": true, "hidden": false }),
  cn("p-4", "m-2", ["flex", "items-center"], { "justify-between": true }),
  cn("p-4 text-sm", "p-6 text-lg", "font-bold")
];

// Log examples to the console
console.log("CN Function Examples:");
examples.forEach((example, index) => {
  console.log(`Example ${index + 1}:`, example);
});

// Export examples for browser use
window.cnExamples = examples;
console.log("Examples available as 'window.cnExamples'");

export { examples };