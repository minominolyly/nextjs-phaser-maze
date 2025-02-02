"use client";
import dynamic from "next/dynamic";

export default function GameElement() {
  const Maze = dynamic(() => import("./Maze"), {
    ssr: false,
    loading: () => (
      <div>
        <div className="centering">
          {"loading..."}
        </div>
      </div>
    ),
  });
  return <Maze />;
}
