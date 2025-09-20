// Using import syntax for ESM
import { cn } from "../lib/utils.js";

// Test examples of the cn function
console.log("Example 1:", cn("base-class", "modifier"));
console.log("Example 2:", cn("text-red-500", { "font-bold": true, "hidden": false }));
console.log("Example 3:", cn("p-4", "m-2", ["flex", "items-center"], { "justify-between": true }));

// Example with Tailwind classes that would typically be merged
console.log("Merged classes:", cn("p-4 text-sm", "p-6 text-lg", "font-bold"));