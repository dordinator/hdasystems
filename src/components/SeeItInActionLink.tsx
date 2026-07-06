import { SEE_IT_IN_ACTION_PATH } from "@/lib/site";

type Props = {
  className?: string;
  label?: string;
};

export default function SeeItInActionLink({
  className = "btn-ghost",
  label = "See it in action",
}: Props) {
  return (
    <a href={SEE_IT_IN_ACTION_PATH} className={className}>
      {label}
    </a>
  );
}
