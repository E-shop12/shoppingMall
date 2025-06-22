import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const usePrefetchVisibleRoutes = (routePath) => {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefetch = () => {
      try {
        router.prefetch(routePath);
      } catch (e) {
        console.warn("Prefetch failed", e);
      }
    };

    // Use requestIdleCallback to prefetch immediately if already visible
    const checkImmediate = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        prefetch();
        return true;
      }
      return false;
    };

    // Try prefetch immediately if already in view
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        if (checkImmediate()) return;
        setupObserver();
      });
    } else {
      // Fallback
      if (checkImmediate()) return;
      setupObserver();
    }

    function setupObserver() {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            prefetch();
            observer.disconnect();
          }
        },
        {
          rootMargin: "200px",
        }
      );
      observer.observe(node);

      return () => observer.disconnect();
    }
  }, [routePath, router]);

  return ref;
};

export default usePrefetchVisibleRoutes;
