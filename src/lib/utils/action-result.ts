export type ActionResult<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string[]> };

export function success<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function failure(error: string, details?: Record<string, string[]>): ActionResult<never> {
  return { success: false, error, details };
}
