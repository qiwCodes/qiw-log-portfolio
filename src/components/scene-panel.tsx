import { ReactNode } from "react";

type ScenePanelProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function ScenePanel({ id, className, children }: ScenePanelProps) {
  return (
    <section id={id} className={`scene-panel ${className ?? ""}`}>
      {children}
    </section>
  );
}
