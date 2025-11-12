import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://hsyyrcbibohwvbuwxwok.supabase.co',
  'PUBLIC_ANON_KEY' // usa la chiave anon pubblica, non quella segreta
);

export async function blockIfUnauthorized() {
  const email = localStorage.getItem("user_email");
  const password = sessionStorage.getItem("user_password");

  // Se non ci sono credenziali → vai al CAPTCHA
  if (!email || !password) {
    window.location.href = "https://alestore-official.github.io/AleCAPTCHA";
    return;
  }

  // Prova login con Supabase
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data?.user?.email_confirmed_at) {
    window.location.href = "https://alestore-official.github.io/AleCAPTCHA";
    return;
  }

  // Controlla se l’utente esiste nella tabella
  const { data: profile, error: profileError } = await supabase
    .from("utenti")
    .select("email")
    .eq("email", email)
    .single();

  if (profileError || !profile) {
    window.location.href = "https://alestore-official.github.io/AleCAPTCHA";
    return;
  }

  // Se tutto ok → segna come verificato
  localStorage.setItem("access_verified", "true");
  localStorage.setItem("user_verified", "true");
}