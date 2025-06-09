import svalnatec from "./svalnatec.png";

export const ErrorPage = () => {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h2>💪 „404: Činka nenalezena. Možná byla moc lehká.“</h2>
      <p>Zkus jiný směr, šampióne.</p>
      <img
        src={svalnatec}
        alt="Svalnatej panaček hlásí error"
        style={{ maxWidth: "300px", marginTop: "2rem" }}
      />
    </main>
  );
};
