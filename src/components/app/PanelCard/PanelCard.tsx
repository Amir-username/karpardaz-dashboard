export default function PanelCard({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-2/3 justify-center items-center flex h-full">
      <div className="flex items-center justify-center gap-8 py-40">
        {children}
      </div>
    </main>
  );
}
