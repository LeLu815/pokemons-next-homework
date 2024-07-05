import { Skeleton } from "@/components/ui/skeleton";

function SkeletonComponent() {
  return (
    <Skeleton className="flex max-w-[270px] justify-center items-center border-none aspect-square rounded-md cursor-pointer bg-muted/30" />
  );
}

export default SkeletonComponent;
