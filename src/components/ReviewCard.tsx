import { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const initials = review.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className={className}>
      <CardContent className="p-8 flex flex-col h-full space-y-4">
        <StarRating rating={review.puntuacion} />

        <p className="text-sm text-foreground/80 leading-relaxed flex-grow italic font-light">
          "{review.comentario}"
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-muted/20">
          <Avatar className="h-10 w-10 border border-primary/10">
            <AvatarImage src={review.avatarUrl} alt={review.nombre} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-foreground leading-none">{review.nombre}</span>
            <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-medium">
              {review.fecha} • {review.fuente}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}