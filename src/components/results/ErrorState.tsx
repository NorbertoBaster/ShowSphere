export function ErrorState({ message }: { message: string }) {
  return (
    <div style={{ color: "#ff6b6b" }}>
      Error: {message}
    </div>
  );
}
