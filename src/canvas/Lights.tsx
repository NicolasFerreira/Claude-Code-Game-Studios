"use client";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[50, 30, 50]}
        intensity={1.2}
        color="#ffffff"
      />
      <directionalLight
        position={[-30, -10, -50]}
        intensity={0.4}
        color="#22d3ee"
      />
      <pointLight position={[0, 0, 0]} intensity={0.2} color="#fbbf24" />
    </>
  );
}