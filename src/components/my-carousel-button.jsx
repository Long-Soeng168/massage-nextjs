import {
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

const MyCarouselButton = () => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <CarouselPrevious className="static translate-y-0" />
      <CarouselNext className="static translate-y-0" />
    </div>
  );
};

export default MyCarouselButton;
