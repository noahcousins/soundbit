import { MapPin } from "lucide-react";

export default function PinIcon() {
  return (
    <MapPin
      className="flex rounded-full bg-primary/5 px-1 transition-opacity duration-100 ease-in-out hover:bg-opacity-25"
      size={24}
    />
  );
}
