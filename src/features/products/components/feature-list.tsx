type FeatureListProps = {
  features: string[];
};

export default function FeatureList({ features }: FeatureListProps) {
  
  return (
    <ul className="mt-5 space-y-2 text-sm leading-5 text-neutral-700">
      {features?.map((feature) => (
        <li key={feature} className="flex gap-3">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-700" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
