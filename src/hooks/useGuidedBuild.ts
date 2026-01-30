"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  GuidedBuildProject,
  GuidedBuildStep,
  GuidedBuildSaveState,
  StepCompletionMethod,
} from "@/lib/guided-builds";

interface ValidationResult {
  description: string;
  passed: boolean;
}

interface UseGuidedBuildReturn {
  currentStepIndex: number;
  currentStep: GuidedBuildStep;
  totalSteps: number;
  fileContents: Record<string, string>;
  stepProgress: GuidedBuildSaveState["stepProgress"];
  isStepComplete: boolean;
  isAllComplete: boolean;
  validationResults: ValidationResult[] | null;
  validateStep: () => ValidationResult[];
  autoInsertCode: () => void;
  skipStep: () => void;
  completeStep: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  updateFileContent: (path: string, content: string) => void;
  saveState: GuidedBuildSaveState;
}

export function useGuidedBuild(
  project: GuidedBuildProject,
  savedState: GuidedBuildSaveState | null,
  onSave: (state: GuidedBuildSaveState) => void,
  onComplete: () => void
): UseGuidedBuildReturn {
  // Initialize file contents from saved state or project scaffold
  const [fileContents, setFileContents] = useState<Record<string, string>>(
    () => {
      if (savedState?.fileContents) {
        return savedState.fileContents;
      }
      const contents: Record<string, string> = {};
      for (const file of project.files) {
        contents[file.path] = file.content;
      }
      return contents;
    }
  );

  // Step tracking
  const [currentStepIndex, setCurrentStepIndex] = useState(
    savedState?.currentStepIndex ?? 0
  );
  const [stepProgress, setStepProgress] = useState<
    GuidedBuildSaveState["stepProgress"]
  >(
    () =>
      savedState?.stepProgress ??
      project.steps.map((s) => ({
        stepId: s.id,
        completed: false,
        method: "self" as StepCompletionMethod,
      }))
  );

  const [validationResults, setValidationResults] = useState<
    ValidationResult[] | null
  >(null);

  // Debounce ref for auto-save
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = project.steps[currentStepIndex];
  const totalSteps = project.steps.length;
  const isStepComplete =
    stepProgress[currentStepIndex]?.completed ?? false;
  const isAllComplete = stepProgress.every((sp) => sp.completed);

  // Build current save state
  const buildSaveState = useCallback((): GuidedBuildSaveState => {
    return {
      projectId: project.id,
      currentStepIndex,
      stepProgress,
      fileContents,
      lastSavedAt: new Date().toISOString(),
    };
  }, [project.id, currentStepIndex, stepProgress, fileContents]);

  // Debounced auto-save
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      onSave(buildSaveState());
    }, 300);
  }, [buildSaveState, onSave]);

  // Auto-save on step and file changes
  useEffect(() => {
    debouncedSave();
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [currentStepIndex, stepProgress, fileContents, debouncedSave]);

  // Validate current step
  const validateStep = useCallback((): ValidationResult[] => {
    if (!currentStep) return [];

    const results: ValidationResult[] = currentStep.validation.map((v) => {
      const content = fileContents[v.targetFile] || "";
      let passed = false;
      try {
        const regex = new RegExp(v.pattern);
        passed = regex.test(content);
      } catch {
        passed = false;
      }
      return { description: v.description, passed };
    });

    setValidationResults(results);

    // If all pass, mark step as completed (with "self" method if not already complete)
    if (results.every((r) => r.passed) && !isStepComplete) {
      const newProgress = [...stepProgress];
      newProgress[currentStepIndex] = {
        ...newProgress[currentStepIndex],
        completed: true,
        method: newProgress[currentStepIndex].method === "self" ? "self" : newProgress[currentStepIndex].method,
      };
      setStepProgress(newProgress);

      // Check if all steps are now complete
      if (newProgress.every((sp) => sp.completed)) {
        onComplete();
      }
    }

    return results;
  }, [currentStep, fileContents, isStepComplete, stepProgress, currentStepIndex, onComplete]);

  // Auto-insert code ("Show Me")
  const autoInsertCode = useCallback(() => {
    if (!currentStep) return;

    const targetFile = currentStep.targetFile;
    const content = fileContents[targetFile] || "";
    const lines = content.split("\n");
    const placement = currentStep.placement;
    const codeLines = currentStep.codeToWrite.split("\n");

    let newLines: string[];

    if (placement.type === "line") {
      // Insert at the specified line (1-indexed), pushing existing content down
      const insertIndex = Math.min(placement.line - 1, lines.length);
      newLines = [
        ...lines.slice(0, insertIndex),
        ...codeLines,
        ...lines.slice(insertIndex),
      ];
    } else if (placement.type === "replace-range") {
      // Replace lines from startLine to endLine (1-indexed, inclusive)
      const start = placement.startLine - 1;
      const end = placement.endLine;
      newLines = [
        ...lines.slice(0, start),
        ...codeLines,
        ...lines.slice(end),
      ];
    } else {
      // append
      newLines = [...lines, ...codeLines];
    }

    const newContent = newLines.join("\n");
    setFileContents((prev) => ({ ...prev, [targetFile]: newContent }));

    // Mark as "assisted"
    const newProgress = [...stepProgress];
    newProgress[currentStepIndex] = {
      ...newProgress[currentStepIndex],
      completed: true,
      method: "assisted",
    };
    setStepProgress(newProgress);

    setValidationResults(null);

    // Check if all steps are now complete
    if (newProgress.every((sp) => sp.completed)) {
      onComplete();
    }
  }, [currentStep, fileContents, stepProgress, currentStepIndex, onComplete]);

  // Skip step
  const skipStep = useCallback(() => {
    const newProgress = [...stepProgress];
    newProgress[currentStepIndex] = {
      ...newProgress[currentStepIndex],
      completed: true,
      method: "skipped",
    };
    setStepProgress(newProgress);
    setValidationResults(null);

    // Auto-advance
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }

    // Check if all steps are now complete
    if (newProgress.every((sp) => sp.completed)) {
      onComplete();
    }
  }, [stepProgress, currentStepIndex, totalSteps, onComplete]);

  // Complete step (after validation passes)
  const completeStep = useCallback(() => {
    if (!isStepComplete) {
      const newProgress = [...stepProgress];
      newProgress[currentStepIndex] = {
        ...newProgress[currentStepIndex],
        completed: true,
        method: "self",
      };
      setStepProgress(newProgress);
    }
    setValidationResults(null);
  }, [isStepComplete, stepProgress, currentStepIndex]);

  // Navigation
  const nextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setValidationResults(null);
    }
  }, [currentStepIndex, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setValidationResults(null);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSteps) {
        setCurrentStepIndex(index);
        setValidationResults(null);
      }
    },
    [totalSteps]
  );

  // Update file content (called from editor onChange)
  const updateFileContent = useCallback(
    (path: string, content: string) => {
      setFileContents((prev) => ({ ...prev, [path]: content }));
    },
    []
  );

  return {
    currentStepIndex,
    currentStep,
    totalSteps,
    fileContents,
    stepProgress,
    isStepComplete,
    isAllComplete,
    validationResults,
    validateStep,
    autoInsertCode,
    skipStep,
    completeStep,
    nextStep,
    prevStep,
    goToStep,
    updateFileContent,
    saveState: buildSaveState(),
  };
}
