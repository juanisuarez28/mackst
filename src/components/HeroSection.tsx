interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  bgClass?: string;
  textClass?: string;
  showArrow?: boolean;
  onArrowClick?: () => void;
  minHeight?: string;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  bgClass = "bg-background",
  textClass = "text-foreground",
  showArrow = false,
  onArrowClick,
  minHeight = "min-h-[70vh]",
}: HeroSectionProps) => {
  return (
    <section className={`${bgClass} ${minHeight} relative flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-20 pt-24`}>
      <div className="max-w-[1400px] w-full mx-auto">
        <h1
          className={`font-heading font-bold ${textClass} leading-[0.85] tracking-tight`}
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className={`font-heading text-lg md:text-2xl ${textClass} mt-4 opacity-80`}>
            {subtitle}
          </p>
        )}
        {description && (
          <p className={`font-body text-sm md:text-base ${textClass} mt-6 max-w-xl opacity-70 leading-relaxed`}>
            {description}
          </p>
        )}
      </div>

      {showArrow && (
        <button
          onClick={onArrowClick}
          className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 w-12 h-12 rounded-full border-2 ${textClass} border-current flex items-center justify-center hover:scale-110 transition-transform`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 1v14M1 8l7 7 7-7" />
          </svg>
        </button>
      )}
    </section>
  );
};

export default HeroSection;
