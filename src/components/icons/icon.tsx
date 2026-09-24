import { iconBodies, type IconName } from "./solar";

type IconProps = {
  name: IconName;
  className?: string;
  /** Pass a label only when the icon carries meaning on its own. */
  label?: string;
};

export function Icon({ name, className, label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: iconBodies[name] }}
    />
  );
}
