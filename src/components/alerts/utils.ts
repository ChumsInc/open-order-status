import type {ContextFilter, ContextFilterFunction} from "@/components/alerts/AlertList.tsx";

export function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction {
    return typeof fn === "function";
}
