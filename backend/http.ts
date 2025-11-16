import { ZodError } from "zod";

export type JsonResponse<T> = {
  status: number;
  body: T;
};

export function parseJsonBody<T>(rawBody: unknown): T {
  if (rawBody == null) {
    return {} as T;
  }

  if (typeof rawBody === "string") {
    const trimmed = rawBody.trim();
    if (!trimmed) {
      return {} as T;
    }

    return JSON.parse(trimmed) as T;
  }

  return rawBody as T;
}

export function formErrorResponse(
  error: unknown,
  fallbackMessage: string,
): JsonResponse<{ success: false; message: string; issues?: string[] }> {
  if (error instanceof ZodError) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Invalid form data",
        issues: error.issues.map((issue) => issue.message),
      },
    };
  }

  console.error(fallbackMessage, error);
  return {
    status: 500,
    body: {
      success: false,
      message: fallbackMessage,
    },
  };
}

export function methodNotAllowedResponse(
  method: string | undefined,
  allowed: string[],
): JsonResponse<{ message: string; allowed: string[] }> {
  return {
    status: 405,
    body: {
      message: `Method ${method ?? "UNKNOWN"} not allowed. Allowed: ${allowed.join(", ")}`,
      allowed,
    },
  };
}
