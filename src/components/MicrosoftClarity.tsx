"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

interface MicrosoftClarityProps {
  projectId: string;
}

export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  useEffect(() => {
    if (!projectId) return;
    Clarity.init(projectId);
  }, [projectId]);

  return null;
}

