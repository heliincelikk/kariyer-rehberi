import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedName = localStorage.getItem('kullaniciAdi');
    if (!savedName) return null;
    return {
      name: savedName,
      email: localStorage.getItem('kullaniciEmail') || '',
      role: localStorage.getItem('kullaniciRolu') || 'ogrenci', // ogrenci | mentor
      status: localStorage.getItem('kullaniciDurumu') || 'uni_ogrenci', // uni_ogrenci | lise_ogrenci | uni_mezun | mentor
      department: localStorage.getItem('kullaniciBolum') || localStorage.getItem('kullaniciDisiplin') || 'Bilgisayar Mühendisliği',
      school: localStorage.getItem('kullaniciOkul') || 'İstanbul Teknik Üniversitesi',
      level: localStorage.getItem('kullaniciSinif') || '3. Sınıf',
      workplace: localStorage.getItem('kullaniciIsYeri') || '',
      experience: localStorage.getItem('kullaniciDeneyim') || '',
      gpa: localStorage.getItem('kullaniciGpa') || '3.42',
      bio: localStorage.getItem('kullaniciBio') || 'Mühendislik dünyasında kendimi geliştiren bir teknoloji tutkunuyum.'
    };
  });

  const saveUserToStorage = (userData) => {
    setUser(userData);
    if (!userData) {
      localStorage.clear();
      return;
    }
    localStorage.setItem('kullaniciAdi', userData.name || '');
    localStorage.setItem('kullaniciEmail', userData.email || '');
    localStorage.setItem('kullaniciRolu', userData.role || 'ogrenci');
    localStorage.setItem('kullaniciDurumu', userData.status || 'uni_ogrenci');
    localStorage.setItem('kullaniciBolum', userData.department || '');
    localStorage.setItem('kullaniciDisiplin', userData.department || '');
    localStorage.setItem('kullaniciOkul', userData.school || '');
    localStorage.setItem('kullaniciSinif', userData.level || '');
    localStorage.setItem('kullaniciIsYeri', userData.workplace || '');
    localStorage.setItem('kullaniciDeneyim', userData.experience || '');
    if (userData.gpa) localStorage.setItem('kullaniciGpa', userData.gpa);
    if (userData.bio) localStorage.setItem('kullaniciBio', userData.bio);
  };

  const login = (userData) => {
    saveUserToStorage(userData);
  };

  const logout = () => {
    saveUserToStorage(null);
    window.location.href = '/';
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    saveUserToStorage(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
