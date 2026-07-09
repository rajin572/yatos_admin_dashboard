import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getAvatar } from "@/utils/getAvatar";

interface AvatarUploadProps {
  name: string;
  imageUrl: string | null;
  onChange: (file: File) => void;
}

const AvatarUpload = ({ name, imageUrl, onChange }: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
    e.target.value = "";
  };

  return (
    <div className="relative w-fit">
      <Avatar className="size-20">
        <AvatarImage src={preview ?? imageUrl ?? undefined} alt={name} />
        <AvatarFallback className="bg-secondary-color text-white text-xl font-semibold">
          {getAvatar(name)}
        </AvatarFallback>
      </Avatar>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-0 right-0 flex items-center justify-center size-7 rounded-full bg-secondary-color text-white border-2 border-white cursor-pointer hover:bg-secondary-color/90 transition-colors"
      >
        <Camera className="size-3.5" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUpload;
