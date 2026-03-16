import { X } from "lucide-react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title: string;
  subtitle?: string;
  description: string;
}

const DetailModal = ({ isOpen, onClose, image, title, subtitle, description }: DetailModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        {image && (
          <div className="md:w-1/2 h-64 md:h-auto">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className={`${image ? "md:w-1/2" : "w-full"} p-8 md:p-12 flex flex-col justify-center overflow-y-auto`}>
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="font-body text-sm text-muted-foreground mt-2 uppercase tracking-wider">
              {subtitle}
            </p>
          )}
          <p className="font-body text-sm md:text-base text-foreground/80 mt-6 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
        >
          <X size={18} className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
