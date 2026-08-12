import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const kullaniciAdi = localStorage.getItem('kullaniciAdi');
    const rol = localStorage.getItem('kullaniciRolu');
    const durum = localStorage.getItem('kullaniciDurumu');
    const disiplin = localStorage.getItem('kullaniciDisiplin');
    const okul = localStorage.getItem('kullaniciOkul');
    const bolum = localStorage.getItem('kullaniciBolum');
    const sinif = localStorage.getItem('kullaniciSinif');
    const isYeri = localStorage.getItem('kullaniciIsYeri');
    const deneyim = localStorage.getItem('kullaniciDeneyim');

    if (kullaniciAdi) {
      return { kullaniciAdi, rol, durum, disiplin, okul, bolum, sinif, isYeri, deneyim };
    }
    return null;
  });

  const login = (userData) => {
    localStorage.setItem('kullaniciAdi', userData.kullaniciAdi);
    localStorage.setItem('kullaniciRolu', userData.rol || '');
    localStorage.setItem('kullaniciDurumu', userData.durum || '');
    localStorage.setItem('kullaniciDisiplin', userData.department || '');
    localStorage.setItem('kullaniciOkul', userData.okul || '');
    localStorage.setItem('kullaniciBolum', userData.bolum || '');
    localStorage.setItem('kullaniciSinif', userData.sinif || '');
    localStorage.setItem('kullaniciIsYeri', userData.is_yeri || '');
    localStorage.setItem('kullaniciDeneyim', userData.deneyim || '');

    setUser({
      kullaniciAdi: userData.kullaniciAdi,
      rol: userData.rol,
      durum: userData.durum,
      disiplin: userData.department,
      okul: userData.okul,
      bolum: userData.bolum,
      sinif: userData.sinif,
      isYeri: userData.is_yeri,
      deneyim: userData.deneyim
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
