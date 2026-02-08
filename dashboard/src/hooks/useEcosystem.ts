import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import type { EcosystemSnapshot } from "@/lib/types";

export function useEcosystem() {
  return useSWR<EcosystemSnapshot>(
    "/api/v1/ecosystem",
    apiFetch,
    { refreshInterval: 30000 }
  );
}
