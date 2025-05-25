// Rate limiting and retry utilities for API requests

export interface RateLimitConfig {
  batchSize: number; // Number of requests per batch
  delayBetweenBatches: number; // Delay in milliseconds between batches
  maxRetries: number; // Maximum number of retries for failed requests
  retryDelay: number; // Delay between retries in milliseconds
}

export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  batchSize: 20,
  delayBetweenBatches: 1000, // 1 second
  maxRetries: 3,
  retryDelay: 2000, // 2 seconds
};

/**
 * Sleep utility function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Check if an error is a CORS error
 */
export const isCorsError = (error: unknown): boolean => {
  if (!error) return false;

  // Type guard to check if error has message property
  const hasMessage = (err: unknown): err is { message: string } => {
    return (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as any).message === "string"
    );
  };

  // Type guard to check if error has name property
  const hasName = (err: unknown): err is { name: string } => {
    return (
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      typeof (err as any).name === "string"
    );
  };

  const errorMessage = hasMessage(error) ? error.message.toLowerCase() : "";
  const errorString = String(error).toLowerCase();
  const errorName = hasName(error) ? error.name : "";

  return (
    errorMessage.includes("cors") ||
    errorMessage.includes("cross-origin") ||
    errorMessage.includes("network error") ||
    errorMessage.includes("failed to fetch") ||
    errorString.includes("cors") ||
    errorString.includes("cross-origin") ||
    (errorName === "TypeError" && errorMessage.includes("fetch"))
  );
};

/**
 * Execute requests with rate limiting and retry logic
 */
export async function executeWithRateLimit<T, R>(
  items: T[],
  requestFn: (item: T) => Promise<R>,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT_CONFIG
): Promise<Array<{ item: T; result?: R; error?: any; success: boolean }>> {
  const results: Array<{ item: T; result?: R; error?: any; success: boolean }> =
    [];
  const failedItems: Array<{ item: T; retryCount: number }> = [];

  console.log(
    `[RateLimit] Starting batch processing for ${items.length} items`
  );
  console.log(
    `[RateLimit] Config: ${config.batchSize} requests per batch, ${config.delayBetweenBatches}ms delay between batches`
  );

  // Process items in batches
  for (let i = 0; i < items.length; i += config.batchSize) {
    const batch = items.slice(i, i + config.batchSize);
    const batchNumber = Math.floor(i / config.batchSize) + 1;
    const totalBatches = Math.ceil(items.length / config.batchSize);

    console.log(
      `[RateLimit] Processing batch ${batchNumber}/${totalBatches} (${batch.length} items)`
    );

    // Execute batch requests in parallel
    const batchPromises = batch.map(async (item) => {
      try {
        const result = await requestFn(item);
        return { item, result, success: true };
      } catch (error) {
        console.warn(`[RateLimit] Request failed for item:`, item, error);

        if (isCorsError(error)) {
          const errorMessage =
            error && typeof error === "object" && "message" in error
              ? String((error as any).message)
              : String(error);
          console.warn(
            `[RateLimit] CORS error detected, marking for retry:`,
            errorMessage
          );
          failedItems.push({ item, retryCount: 0 });
        }

        return { item, error, success: false };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Add delay between batches (except for the last batch)
    if (i + config.batchSize < items.length) {
      console.log(
        `[RateLimit] Waiting ${config.delayBetweenBatches}ms before next batch...`
      );
      await sleep(config.delayBetweenBatches);
    }
  }

  // Retry failed items
  if (failedItems.length > 0) {
    console.log(`[RateLimit] Retrying ${failedItems.length} failed items...`);
    await retryFailedItems(failedItems, requestFn, results, config);
  }

  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.filter((r) => !r.success).length;

  console.log(
    `[RateLimit] Batch processing completed: ${successCount} successful, ${failureCount} failed`
  );

  return results;
}

/**
 * Retry failed items with exponential backoff
 */
async function retryFailedItems<T, R>(
  failedItems: Array<{ item: T; retryCount: number }>,
  requestFn: (item: T) => Promise<R>,
  results: Array<{ item: T; result?: R; error?: any; success: boolean }>,
  config: RateLimitConfig
): Promise<void> {
  const itemsToRetry = failedItems.filter(
    ({ retryCount }) => retryCount < config.maxRetries
  );

  if (itemsToRetry.length === 0) {
    console.log(`[RateLimit] No more items to retry`);
    return;
  }

  console.log(
    `[RateLimit] Retrying ${itemsToRetry.length} items (attempt ${
      itemsToRetry[0]?.retryCount + 1
    }/${config.maxRetries})`
  );

  // Wait before retrying
  await sleep(config.retryDelay);

  const newFailedItems: Array<{ item: T; retryCount: number }> = [];

  // Process retries in smaller batches
  const retryBatchSize = Math.max(1, Math.floor(config.batchSize / 2));

  for (let i = 0; i < itemsToRetry.length; i += retryBatchSize) {
    const retryBatch = itemsToRetry.slice(i, i + retryBatchSize);

    const retryPromises = retryBatch.map(async ({ item, retryCount }) => {
      try {
        const result = await requestFn(item);

        // Update the original result
        const originalIndex = results.findIndex((r) => r.item === item);
        if (originalIndex !== -1) {
          results[originalIndex] = { item, result, success: true };
        }

        console.log(`[RateLimit] Retry successful for item:`, item);
        return { item, success: true };
      } catch (error) {
        console.warn(
          `[RateLimit] Retry failed for item (attempt ${retryCount + 1}):`,
          item,
          error
        );

        if (isCorsError(error)) {
          newFailedItems.push({ item, retryCount: retryCount + 1 });
        } else {
          // Update the original result with the new error
          const originalIndex = results.findIndex((r) => r.item === item);
          if (originalIndex !== -1) {
            results[originalIndex] = { item, error, success: false };
          }
        }

        return { item, success: false };
      }
    });

    await Promise.all(retryPromises);

    // Small delay between retry batches
    if (i + retryBatchSize < itemsToRetry.length) {
      await sleep(500);
    }
  }

  // Recursively retry if there are still failed items
  if (newFailedItems.length > 0) {
    await retryFailedItems(newFailedItems, requestFn, results, config);
  }
}

/**
 * Wrapper for single API requests with retry logic
 */
export async function executeWithRetry<T>(
  requestFn: () => Promise<T>,
  config: Pick<RateLimitConfig, "maxRetries" | "retryDelay"> = {
    maxRetries: DEFAULT_RATE_LIMIT_CONFIG.maxRetries,
    retryDelay: DEFAULT_RATE_LIMIT_CONFIG.retryDelay,
  }
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[Retry] Attempt ${attempt + 1}/${config.maxRetries + 1}`);
        await sleep(config.retryDelay * attempt); // Exponential backoff
      }

      return await requestFn();
    } catch (error) {
      lastError = error;

      if (isCorsError(error)) {
        const errorMessage =
          error && typeof error === "object" && "message" in error
            ? String((error as any).message)
            : String(error);
        console.warn(
          `[Retry] CORS error on attempt ${attempt + 1}, will retry:`,
          errorMessage
        );
        continue;
      } else {
        // Non-CORS error, don't retry
        throw error;
      }
    }
  }

  throw lastError;
}
