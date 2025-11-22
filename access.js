import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const supabase = createClient(
  'https://hsyyrcbibohwvbuwxwok.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeXlyY2JpYm9od3ZidXd4d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNjE0MDcsImV4cCI6MjA3NjYzNzQwN30.2KsFsGYjwf_cA7Z9oglVthiaE1_jWYuQ6HMMm5UXsyo'
);

export async function blockIfUnauthorized() {
  const email = localStorage.getItem("user_email");
  const password = localStorage.getItem("user_password");

  if (!email || !password) {
    window.location.href = "https://alestore-official.github.io/AleRegister";
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data?.user || !data.user.email_confirmed_at) {
    window.location.href = "https://alestore-official.github.AleRegister";
    return;
  }
}