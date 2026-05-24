export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-semibold">Privacy at the core</h1>
      <div className="mt-8 space-y-4 text-zinc-300">
        <p>ShareFlow is intentionally stateless: no accounts, no authentication, and no behavioral tracking.</p>
        <p>Media is processed only for the current request and streamed directly to your device whenever possible.</p>
        <p>No permanent file storage is used in the default architecture. Optional temporary edge caching can be enabled with strict TTL and purge controls.</p>
      </div>
    </main>
  );
}
