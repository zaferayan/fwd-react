const App = () => {
  const isim = "Zafer";
  const girisYapildiMi = true;
  return (
    <>
      <h1>Toplam: {20 + 22}</h1>
      <h1>Isim: {isim}</h1>
      <h1>Tarih: {new Date().toLocaleTimeString()}</h1>
      <h1>{girisYapildiMi ? "Hoşgeldin" : "Giriş yap"}</h1>
    </>
  );
};

export default App;
